package domain

import "time"

type TransactionGroup struct {
	Day          time.Time
	SumInUSD     float64
	ReceiveCount uint
	SendCount    uint
}
