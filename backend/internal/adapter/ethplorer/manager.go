package ethplorer

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
	"go.uber.org/zap"
)

const baseURL = "https://api.ethplorer.io"

var (
	getTransactionsURL = baseURL + "/getAddressTransactions/%s" // blockchain, address
)

type Manager struct {
	c      *http.Client
	logger *zap.Logger

	apiKey string
}

func New(
	c *http.Client,
	logger *zap.Logger,
) (*Manager, error) {
	if c == nil {
		return nil, errors.New("client is nil")
	}

	if logger == nil {
		return nil, errors.New("logger is nil")
	}

	return &Manager{
		c:      c,
		logger: logger,

		apiKey: "gunng6075LcTv51",
	}, nil
}

func (m Manager) GetTransactions(
	ctx context.Context,
	address string,
	limit uint,
) ([]domain.Transaction, error) {

	u, err := url.Parse(fmt.Sprintf(getTransactionsURL, address))
	if err != nil {
		return nil, fmt.Errorf("parse URL: %w", err)
	}

	params := url.Values{}
	params.Add("apiKey", m.apiKey)
	if limit != 0 {
		params.Add("limit", strconv.Itoa(int(limit)))
	}

	u.RawQuery = params.Encode()
	requestURL := u.String()

	request, err := http.NewRequest(http.MethodGet, requestURL, nil)
	if err != nil {
		return nil, fmt.Errorf("new request: %w", err)
	}

	resp, err := m.c.Do(request)
	if err != nil {
		return nil, fmt.Errorf("make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		m.logger.Error(
			"error in making request",
			zap.Int("status_code", resp.StatusCode),
			zap.String("request_url", requestURL),
		)
		return nil, errors.New("error in request")
	}

	var respEntity []Transaction

	if err := json.NewDecoder(resp.Body).Decode(&respEntity); err != nil {
		return nil, fmt.Errorf("unmarshal response: %w", err)
	}

	dmTransactions, err := m.prepareResponse(respEntity, address)
	if err != nil {
		return nil, fmt.Errorf("prepare response: %w", err)
	}

	return dmTransactions, nil
}

func (m Manager) prepareResponse(transactions []Transaction, userAddress string) ([]domain.Transaction, error) {
	var domainTransactions []domain.Transaction

	for _, localTrans := range transactions {
		var withAddress string
		if localTrans.From == userAddress {
			withAddress = localTrans.To
		} else {
			withAddress = localTrans.From
		}

		domainTrans, err := domain.NewTransaction(domain.TransactionDTO{
			Date:     time.Unix(localTrans.Timestamp, 0),
			With:     withAddress,
			Sended:   localTrans.From == userAddress,
			Hash:     localTrans.Hash,
			USDPrice: localTrans.UsdPrice,
		})
		if err != nil {
			return nil, fmt.Errorf("new domain transaction: %w", err)
		}

		domainTransactions = append(domainTransactions, domainTrans)
	}

	return domainTransactions, nil
}
