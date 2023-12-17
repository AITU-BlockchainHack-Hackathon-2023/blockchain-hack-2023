package oraclus

import (
	"time"
)

type Transaction struct {
	Currency         string `json:"currency"`
	Effect           string `json:"effect"`
	Failed           bool   `json:"failed"`
	Block            int64  `json:"block"`
	Time             string `json:"time"`
	Transaction      string `json:"transaction"`
	Module           string `json:"module"`
	Name             string `json:"name"`
	Symbol           string `json:"symbol"`
	Decimals         int    `json:"decimals"`
	EffectNormalized string `json:"effect_normalized"`
}

type Asset struct {
	ID              string   `json:"id"`
	Module          string   `json:"module"`
	Name            string   `json:"name"`
	Symbol          string   `json:"symbol"`
	Logo            string   `json:"logo"`
	Categories      []string `json:"categories"`
	ContractAddress string   `json:"contract_address"`
	Decimals        int      `json:"decimals"`
	Balance         string   `json:"balance"`
	BalanceRaw      string   `json:"balance_raw"`
	BalanceUSD      string   `json:"balance_usd"`
}

type Token struct {
	ID               string  `json:"id"`
	Module           string  `json:"module"`
	Name             string  `json:"name"`
	Symbol           string  `json:"symbol"`
	Logo             string  `json:"logo"`
	ContractAddress  string  `json:"contract_address"`
	Decimals         int     `json:"decimals"`
	Effect           string  `json:"effect"`
	EffectNormalized string  `json:"effect_normalized"`
	EffectUSD        float64 `json:"effect_usd"`
}

type GetAccountResponseEntity struct {
	Address       string          `json:"address"`
	Blockchain    string          `json:"blockchain"`
	UpdatedAt     time.Time       `json:"updated_at"`
	Type          string          `json:"type"`
	AddressOwner  string          `json:"address_owner"`
	LinkOwner     string          `json:"link_owner"`
	LabelName     string          `json:"label_name"`
	NameTag       string          `json:"name_tag"`
	Domains       []string        `json:"domains"`
	NetWorthUSD   string          `json:"net_worth_usd"`
	Assets        []Asset         `json:"assets"`
	Transactions  [10]Transaction `json:"transactions"`
	FirstIn       time.Time       `json:"first_in"`
	FirstOut      time.Time       `json:"first_out"`
	LastIn        time.Time       `json:"last_in"`
	LastOut       time.Time       `json:"last_out"`
	WalletAgeDays int             `json:"wallet_age_days"`
}

type Transfer struct {
	Failed          bool    `json:"failed"`
	Module          string  `json:"module"`
	Address         string  `json:"address"`
	Sender          string  `json:"sender"`
	Recipient       string  `json:"recipient"`
	Value           string  `json:"value"`
	ValueNormalized float64 `json:"value_normalized"`
	ValueUSD        float64 `json:"value_usd"`
	Name            string  `json:"name"`
	Symbol          string  `json:"symbol"`
	Decimals        int     `json:"decimals"`
}
type GetTransactionResponseEntity struct {
	Failed        bool       `json:"failed"`
	BlockID       int        `json:"block_id"`
	Time          time.Time  `json:"time"`
	Fee           string     `json:"fee"`
	FeeDecimals   int        `json:"fee_decimals"`
	FeeSymbol     string     `json:"fee_symbol"`
	FeeName       string     `json:"fee_name"`
	FeeAddress    string     `json:"fee_address"`
	PrivacyScore  *int       `json:"privacy_score"`
	FeeUSD        float64    `json:"fee_usd"`
	Transfers     []Transfer `json:"transfers"`
	FeeNormalized float64    `json:"fee_normalized"`
}
