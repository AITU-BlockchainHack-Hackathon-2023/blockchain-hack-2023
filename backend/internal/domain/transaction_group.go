package domain

import "time"

type TransactionGroup struct {
	Day          time.Time
	Price        float64
	PriceInUSD   float64
	ReceiveCount uint
	SendCount    uint
}
