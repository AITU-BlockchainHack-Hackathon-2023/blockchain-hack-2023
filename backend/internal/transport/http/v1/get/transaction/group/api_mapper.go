package group

import (
	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
)

type ApiMapper struct {
	txGroups []domain.TransactionGroup
}

func NewApiMapper(txGroups []domain.TransactionGroup) ApiMapper {
	return ApiMapper{txGroups: txGroups}
}

func (m ApiMapper) ToResponse() []Response {
	dmTransactionGroups := m.txGroups

	response := make([]Response, 0, len(dmTransactionGroups))

	for _, dmTransactionGroup := range dmTransactionGroups {
		var respTransactions []Transaction
		for _, transaction := range dmTransactionGroup.Transactions {
			respTransactions = append(respTransactions, Transaction(transaction))
		}

		response = append(response, Response{
			Day:          dmTransactionGroup.Day,
			ReceiveSum:   dmTransactionGroup.ReceiveSum,
			SendSum:      dmTransactionGroup.SendSum,
			ReceiveCount: dmTransactionGroup.ReceiveCount,
			SendCount:    dmTransactionGroup.SendCount,
			Transactions: respTransactions,
		})

	}

	return response
}
