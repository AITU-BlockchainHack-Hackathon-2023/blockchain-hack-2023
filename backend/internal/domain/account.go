package domain

import (
	"errors"
	"fmt"
	"time"
)

type Account struct {
	Address      string
	Type         string
	NetWorthUSD  float64
	UpdatedAt    time.Time
	WalletAge    int
	Transactions []Transaction 
	Tokens       []Token 
}

func NewAccount(
	dto AccountDTO,
	transactions []Transaction,
	tokens []Token,
) (Account, error) {
	if err := dto.Validate(); err != nil {
		return Account{}, fmt.Errorf("validate: %w", err)
	}

	return Account{
		Address:      dto.Address,
		Type:         dto.Type,
		UpdatedAt:    dto.UpdatedAt,
		NetWorthUSD:  dto.NetWorthUSD,
		WalletAge:    dto.WalletAge,
		Transactions: transactions,
		Tokens:       tokens,
	}, nil
}

type AccountDTO struct {
	Address     string
	Type        string
	NetWorthUSD float64
	WalletAge   int
	UpdatedAt   time.Time
}

func (d AccountDTO) Validate() error {
	if d.Address == "" {
		return errors.New("address is empty")
	}

	if d.Type == "" {
		return errors.New("type is empty")
	}

	return nil
}
