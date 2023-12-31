package domain

import (
	"errors"
	"fmt"
	"time"
)

type Transaction struct {
	Date time.Time
	With string // `with` this address transaction was provided

	// IsSender is a boolean flag indicating the direction of the transaction.
	// `true` means the transaction is initiated "from" the user,
	// `false` implies the transaction is directed "to" the user.
	IsSender bool
	Hash     string
	USDPrice float64
}

func NewTransaction(dto TransactionDTO) (Transaction, error) {
	if err := dto.Validate(); err != nil {
		return Transaction{}, fmt.Errorf("validate: %w", err)
	}

	return Transaction(dto), nil
}

type TransactionDTO struct {
	Date     time.Time
	With     string
	IsSender bool
	Hash     string
	USDPrice float64
}

func (d TransactionDTO) Validate() error {
	if d.Date.IsZero() {
		return errors.New("date is zero")
	}

	if d.Hash == "" {
		return errors.New("hash is empty")
	}

	return nil
}
