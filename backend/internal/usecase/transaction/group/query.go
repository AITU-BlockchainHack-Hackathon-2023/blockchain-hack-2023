package group

import (
	"context"
	"errors"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
	"go.uber.org/zap"
)

type TransactionsGetter interface {
	GetTransactions(
		ctx context.Context,
		address string,
		limit uint,
	) ([]domain.Transaction, error)
}

type Query struct {
	transactionsGetter TransactionsGetter

	logger *zap.Logger
}

func New(
	transactionsGetter TransactionsGetter,
	logger *zap.Logger,
) (*Query, error) {
	if transactionsGetter == nil {
		return nil, errors.New("transactions getter is nil")
	}

	if logger == nil {
		return nil, errors.New("logger is nil")
	}

	return &Query{
		transactionsGetter: transactionsGetter,
		logger:             logger,
	}, nil
}

func (q Query) Execute(
	ctx context.Context,
	address,
	blockchain string,
) (
	[]domain.TransactionGroup,
	error,
) {
	return nil, nil
}
