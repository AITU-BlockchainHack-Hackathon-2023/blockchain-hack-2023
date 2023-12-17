package account

import (
	"github.com/Levap123/blockchain-hack-2023/backend/internal/domain"
)

type ApiMapper struct {
	account domain.Account
}

func NewApiMapper(account domain.Account) ApiMapper {
	return ApiMapper{account: account}
}

func (m ApiMapper) ToResponse() Response {
	dmTransactions := m.account.Transactions
	dmTokens := m.account.Tokens

	transactions := make([]Transaction, 0, len(dmTransactions))
	for _, dmTx := range dmTransactions {
		buffer := Transaction{
			Date:     dmTx.Date,
			With:     dmTx.With,
			IsSender: dmTx.IsSender,
			Hash:     dmTx.Hash,
			USDPrice: dmTx.USDPrice,
		}

		transactions = append(transactions, buffer)
	}

	tokens := make([]Token, 0, len(dmTokens))
	for _, dmToken := range dmTokens {
		buffer := Token{
			Name:       dmToken.Name,
			Symbol:     dmToken.Symbol,
			LogoURL:    dmToken.LogoURL,
			Balance:    dmToken.Balance,
			BalanceUSD: dmToken.BalanceUSD,
		}

		tokens = append(tokens, buffer)
	}

	return Response{
		Address:      m.account.Address,
		Type:         m.account.Type,
		NetWorthUSD:  m.account.NetWorthUSD,
		UpdatedAt:    m.account.UpdatedAt,
		WalletAge:    m.account.WalletAge,
		Transactions: transactions,
		Tokens:       tokens,
	}
}
