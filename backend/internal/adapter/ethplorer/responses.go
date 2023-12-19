package ethplorer

type Transaction struct {
	Timestamp int64   `json:"timestamp"`
	From      string  `json:"from"`
	To        string  `json:"to"`
	Hash      string  `json:"hash"`
	Value     float64 `json:"value"`
	UsdPrice  float64 `json:"usdPrice"`
	UsdValue  float64 `json:"usdValue"`
	Success   bool    `json:"success"`
}
