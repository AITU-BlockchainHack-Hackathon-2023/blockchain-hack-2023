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

type TransactionGetter interface {
	GetTransactionByHash(
		ctx context.Context,
		blockchain,
		address,
		transactionHash string,
	) (domain.Transaction, error)
}

type Query struct {
	accountGetter AccountGetter
	txGetter      TransactionGetter
	logger        *zap.Logger
}

func New(
	accountGetter AccountGetter,
	txGetter TransactionGetter,
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
	accountDTO, tokens, err := q.accountGetter.GetAddressInfo(ctx, blockchain, address)
	if err != nil {
		return domain.Account{}, fmt.Errorf("get address info: %w", err)
	}

	var transactions []domain.Transaction
	for _, txHash := range accountDTO.TransactionHashes {
		tx, err := q.txGetter.GetTransactionByHash(
			ctx,
			blockchain,
			address,
			txHash,
		)
		if err != nil {
			return domain.Account{}, fmt.Errorf("get transaction by hash: %w", err)
		}

		transactions = append(transactions, tx)
	}

	account, err := domain.NewAccount(accountDTO, transactions, tokens)
	if err != nil {
		return domain.Account{}, fmt.Errorf("new account: %w", err)
	}

	return account, nil
}
