package oraclus

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"go.uber.org/zap"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
)

const baseURL = "https://leap.oraclus.com/v1"

var (
	getWalletURL = baseURL + "/address/%s/%s" // blockchain, address

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
) (domain.AccountDTO, error) {
	requestURL := fmt.Sprintf(getWalletURL, blockchain, address)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, requestURL, nil)
	if err != nil {
		return domain.AccountDTO{}, fmt.Errorf("new request: %w", err)
	}

	resp, err := m.c.Do(req)
	if err != nil {
		return domain.AccountDTO{}, fmt.Errorf("make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		m.logger.Error(
			"error in making request",
			zap.Int("status_code", resp.StatusCode),
			zap.String("request_url", requestURL),
		)
		return domain.AccountDTO{}, errors.New("error in request")
	}

	var respEntity ResponseEntity
	if err := json.NewDecoder(resp.Body).Decode(&respEntity); err != nil {
		return domain.AccountDTO{}, fmt.Errorf("unmarshal response")
	}

	return domain.AccountDTO{
		Address:     respEntity.Address,
		Type:        respEntity.Type,
		NetWorthUSD: respEntity.NetWorthUSD,
		WalletAge:   respEntity.WalletAgeDays,
		UpdatedAt:   respEntity.UpdatedAt,
	}, nil
}
