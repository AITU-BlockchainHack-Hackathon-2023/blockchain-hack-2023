package group

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"time"

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
	transactions, err := q.transactionsGetter.GetTransactions(ctx, address, 10_000)
	if err != nil {
		return nil, fmt.Errorf("get transactions: %w", err)
	}

	dayGroup := make(map[time.Time]domain.TransactionGroup)

	for _, transaction := range transactions {
		day := time.Date(
			transaction.Date.Year(),
			transaction.Date.Month(),
			transaction.Date.Day(),
			0, 0, 0, 0,
			transaction.Date.Location())

		transactionGroup, found := dayGroup[day]
		if !found {
			transactionGroup = domain.TransactionGroup{Day: day}
		}

		if transaction.IsSender {
			transactionGroup.SendSum += transaction.USDPrice
			transactionGroup.SendCount++
		} else {
			transactionGroup.ReceiveSum += transaction.USDPrice
			transactionGroup.ReceiveCount++
		}

		dayGroup[day] = transactionGroup
	}

	transactionGroups := make([]domain.TransactionGroup, 0, len(dayGroup))
	for _, v := range dayGroup {
		transactionGroups = append(transactionGroups, v)
	}

	sort.Slice(transactionGroups, func(i, j int) bool {
		return transactionGroups[i].Day.Unix() < transactionGroups[j].Day.Unix()
	})

	return transactionGroups, nil
}
