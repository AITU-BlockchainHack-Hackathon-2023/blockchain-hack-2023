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
		response = append(response, Response(dmTransactionGroup))
	}

	return response
}
