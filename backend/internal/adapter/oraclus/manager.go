package oraclus

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"go.uber.org/zap"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
)

const baseURL = "https://leap.oraclus.com/v1"

var (
	getWalletURL            = baseURL + "/address/%s/%s"     // blockchain, address
	getTransactionByHashURL = baseURL + "/transaction/%s/%s" // blockchain, tx_hash
)

type Manager struct {
	c      *http.Client
	logger *zap.Logger
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
	}, nil
}

func (m Manager) GetAddressInfo(
	ctx context.Context,
	blockchain,
	address string,
) (
	domain.AccountDTO,
	[]domain.Token,
	error,
) {
	requestURL := fmt.Sprintf(getWalletURL, blockchain, address)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, requestURL, nil)
	if err != nil {
		return domain.AccountDTO{}, nil, fmt.Errorf("new request: %w", err)
	}

	resp, err := m.c.Do(req)
	if err != nil {
		return domain.AccountDTO{}, nil, fmt.Errorf("make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		m.logger.Error(
			"error in making request",
			zap.Int("status_code", resp.StatusCode),
			zap.String("request_url", requestURL),
		)
		return domain.AccountDTO{}, nil, errors.New("error in request")
	}

	var respEntity GetAccountResponseEntity
	if err := json.NewDecoder(resp.Body).Decode(&respEntity); err != nil {
		return domain.AccountDTO{}, nil, fmt.Errorf("unmarshal response: %w", err)
	}

	var transactionHashes []string
	for _, transaction := range respEntity.Transactions {
		transactionHashes = append(transactionHashes, transaction.Transaction)
	}

	tokens := make([]domain.Token, 0, len(respEntity.Assets))
	for _, token := range respEntity.Assets {
		balance, err := strconv.ParseFloat(token.Balance, 64)
		if err != nil {
			return domain.AccountDTO{}, nil, fmt.Errorf("parse float: %w", err)
		}

		balanceUSD, err := strconv.ParseFloat(token.BalanceUSD, 64)
		if err != nil {
			return domain.AccountDTO{}, nil, fmt.Errorf("parse float: %w", err)
		}

		buffer, err := domain.NewToken(domain.TokenDTO{
			Name:       token.Name,
			Symbol:     token.Symbol,
			LogoURL:    token.Logo,
			Balance:    balance,
			BalanceUSD: balanceUSD,
		})
		if err != nil {
			return domain.AccountDTO{}, nil, fmt.Errorf("new domain token: %w", err)
		}

		tokens = append(tokens, buffer)
	}

	usd, err := strconv.ParseFloat(respEntity.NetWorthUSD, 64)
	if err != nil {
		return domain.AccountDTO{}, nil, fmt.Errorf("parse float: %w", err)
	}

	return domain.AccountDTO{
		Address:           respEntity.Address,
		Type:              respEntity.Type,
		NetWorthUSD:       usd,
		WalletAge:         respEntity.WalletAgeDays,
		UpdatedAt:         respEntity.UpdatedAt,
		TransactionHashes: transactionHashes,
	}, tokens, nil
}

func (m Manager) GetTransactionByHash(
	ctx context.Context,
	blockchain,
	address,
	transactionHash string,
) (domain.Transaction, error) {
	requestURL := fmt.Sprintf(getTransactionByHashURL, blockchain, transactionHash)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, requestURL, nil)
	if err != nil {
		return domain.Transaction{}, fmt.Errorf("new request: %w", err)
	}

	resp, err := m.c.Do(req)
	if err != nil {
		return domain.Transaction{}, fmt.Errorf("make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		m.logger.Error(
			"error in making request",
			zap.Int("status_code", resp.StatusCode),
			zap.String("request_url", requestURL),
		)
		return domain.Transaction{}, errors.New("error in request")
	}

	var respEntity GetTransactionResponseEntity
	if err := json.NewDecoder(resp.Body).Decode(&respEntity); err != nil {
		return domain.Transaction{}, fmt.Errorf("unmarshal response: %w", err)
	}

	if len(respEntity.Transfers) <= 0 {
		return domain.Transaction{}, errors.New("there is no transfers")
	}

	transfer := respEntity.Transfers[0]
	var withAddress string
	if transfer.Sender == address {
		withAddress = transfer.Recipient
	} else {
		withAddress = transfer.Sender
	}

	domainTransaction, err := domain.NewTransaction(domain.TransactionDTO{
		Date:     respEntity.Time,
		With:     withAddress,
		IsSender: transfer.Sender == address,
		Hash:     transactionHash,
		USDPrice: transfer.ValueUSD,
	})
	if err != nil {
		return domain.Transaction{}, fmt.Errorf("new domain transaction")
	}

	return domainTransaction, nil
}
