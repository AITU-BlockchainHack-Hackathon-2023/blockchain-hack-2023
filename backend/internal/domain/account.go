package domain

import (
	"errors"
	"fmt"
)

type Account struct {
	Address      string
	Type         string
	NetWorthUSD  float64
	transactions []Transaction
	tokens       []Token
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
		NetWorthUSD:  dto.NetWorthUSD,
		transactions: transactions,
		tokens:       tokens,
	}, nil
}

type AccountDTO struct {
	Address     string
	Type        string
	NetWorthUSD float64
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
