package group

import "time"

type Transaction struct {
	Date     time.Time `json:"date"`
	With     string    `json:"with"`
	IsSender bool      `json:"is_sender"`
	Hash     string    `json:"hash"`
	USDPrice float64   `json:"usd_price"`
}

type Response struct {
	Day          time.Time     `json:"day,omitempty"`
	ReceiveSum   float64       `json:"receive_sum,omitempty"`
	SendSum      float64       `json:"send_sum,omitempty"`
	ReceiveCount uint          `json:"receive_count,omitempty"`
	SendCount    uint          `json:"send_count,omitempty"`
	Transactions []Transaction `json:"transactions,omitempty"`
}
