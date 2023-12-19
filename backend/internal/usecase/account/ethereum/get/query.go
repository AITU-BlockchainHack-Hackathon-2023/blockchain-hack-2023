package get

import (
	"context"
	"errors"
	"fmt"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
	"go.uber.org/zap"
)

type AccountGetter interface {
	GetAddressInfo(
		ctx context.Context,
		blockchain,
		address string,
	) (domain.AccountDTO, []domain.Token, error)
}

type TransactionsGetter interface {
	GetTransactions(
		ctx context.Context,
		address string,
		limit uint,
	) ([]domain.Transaction, error)
}

type Query struct {
	accountGetter AccountGetter
	txGetter      TransactionsGetter
	logger        *zap.Logger
}

func New(
	accountGetter AccountGetter,
	txGetter TransactionsGetter,
	logger *zap.Logger,
) (*Query, error) {
	if accountGetter == nil {
		return nil, errors.New("account getter is nil")
	}

	if txGetter == nil {
		return nil, errors.New("tx getter is nil")
	}

	if logger == nil {
		return nil, errors.New("logger is nil")
	}

	return &Query{
		accountGetter: accountGetter,
		txGetter:      txGetter,
		logger:        logger,
	}, nil
}

func (q Query) Execute(
	ctx context.Context,
	blockchain,
	address string,
	limit uint,
) (domain.Account, error) {
	transactions, err := q.txGetter.GetTransactions(ctx, address, limit)
	if err != nil {
		return domain.Account{}, fmt.Errorf("get transactions: %w", err)
	}

	accountDTO, tokens, err := q.accountGetter.GetAddressInfo(ctx, blockchain, address)
	if err != nil {
		return domain.Account{}, fmt.Errorf("get address info: %w", err)
	}

	account, err := domain.NewAccount(accountDTO, transactions, tokens)
	if err != nil {
		return domain.Account{}, fmt.Errorf("new account: %w", err)
	}

	return account, nil
}
