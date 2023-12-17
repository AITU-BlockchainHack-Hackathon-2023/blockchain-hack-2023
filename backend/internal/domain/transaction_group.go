package domain

import "time"

type TransactionGroup struct {
	Day          time.Time
	ReceiveSum   float64
	SendSum      float64
	ReceiveCount uint
	SendCount    uint
}
