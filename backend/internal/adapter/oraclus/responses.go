package oraclus

import (
	"time"
)

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

type ResponseEntity struct {
	Address       string    `json:"address"`
	Blockchain    string    `json:"blockchain"`
	UpdatedAt     time.Time `json:"updated_at"`
	Type          string    `json:"type"`
	AddressOwner  string    `json:"address_owner"`
	LinkOwner     string    `json:"link_owner"`
	LabelName     string    `json:"label_name"`
	NameTag       string    `json:"name_tag"`
	Domains       []string  `json:"domains"`
	NetWorthUSD   string    `json:"net_worth_usd"`
	Assets        []Asset   `json:"assets"`
	FirstIn       time.Time `json:"first_in"`
	FirstOut      time.Time `json:"first_out"`
	LastIn        time.Time `json:"last_in"`
	LastOut       time.Time `json:"last_out"`
	WalletAgeDays int       `json:"wallet_age_days"`
}
