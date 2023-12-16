package oraclus

import (
	"errors"
	"net/http"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/logger/zap"
)

const baseURL = "https://leap.oraclus.com/v1"

var (
	getTransactionURL = baseURL + "/transaction/%s/%s" // blockchain, tx_hash
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
