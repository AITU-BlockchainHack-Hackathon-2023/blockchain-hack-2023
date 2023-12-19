package account

import "time"

type Response struct {
	Address      string        `json:"address"`
	Type         string        `json:"type"`
	NetWorthUSD  float64       `json:"net_worth_usd"`
	UpdatedAt    time.Time     `json:"updated_at"`
	WalletAge    int           `json:"wallet_age"`
	Transactions []Transaction `json:"transactions"`
	Tokens       []Token       `json:"tokens"`
}

type Transaction struct {
	Date     time.Time `json:"date"`
	With     string    `json:"with"`
	IsSender bool      `json:"is_sender"`
	Hash     string    `json:"hash"`
	USDPrice float64   `json:"usd_price"`
}

type Token struct {
	Name       string  `json:"name"`
	Symbol     string  `json:"symbol"`
	LogoURL    string  `json:"logo_url,omitempty"`
	Balance    float64 `json:"balance"`
	BalanceUSD float64 `json:"balance_usd"`
}
