package domain

import (
	"errors"
	"fmt"
)

type Token struct {
	Name       string
	Symbol     string
	LogoURL    string
	Balance    float64
	BalanceUSD float64
}

func NewToken(dto TokenDTO) (Token, error) {
	if err := dto.Validate(); err != nil {
		return Token{}, fmt.Errorf("validate: %w", err)
	}

	return Token(dto), nil
}

type TokenDTO struct {
	Name       string
	Symbol     string
	LogoURL    string
	Balance    float64
	BalanceUSD float64
}

func (d TokenDTO) Validate() error {
	if d.Name == "" {
		return errors.New("name is empty")
	}

	if d.Symbol == "" {
		return errors.New("symbol is empty")
	}

	if d.LogoURL == "" {
		return errors.New("logo url is empty")
	}

	return nil
}
