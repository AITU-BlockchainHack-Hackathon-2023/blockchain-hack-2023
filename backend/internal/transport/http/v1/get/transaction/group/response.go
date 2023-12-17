package group

import "time"

type Response struct {
	Day          time.Time `json:"day,omitempty"`
	ReceiveSum   float64   `json:"receive_sum,omitempty"`
	SendSum      float64   `json:"send_sum,omitempty"`
	ReceiveCount uint      `json:"receive_count,omitempty"`
	SendCount    uint      `json:"send_count,omitempty"`
}
