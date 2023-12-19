package domain

type Token struct {
	Name       string
	Symbol     string
	LogoURL    string
	Balance    float64
	BalanceUSD float64
}

func NewToken(dto TokenDTO) (Token, error) {
	return Token(dto), nil
}

type TokenDTO struct {
	Name       string
	Symbol     string
	LogoURL    string
	Balance    float64
	BalanceUSD float64
}
