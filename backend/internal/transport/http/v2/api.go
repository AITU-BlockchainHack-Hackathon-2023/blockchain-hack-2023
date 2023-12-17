package v1

import (
	"net/http"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/transport/http/v1/get/account"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/transport/http/v1/get/transaction/group"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/usecase/account/get"
	groupTransactions "github.com/Levap123/blockchain-hack-2023/backend/internal/usecase/transaction/group"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type Api struct {
	getAccountInfoQuery    *get.Query
	groupTransactionsQuery *groupTransactions.Query
	logger                 *zap.Logger
}

func New(
	getAccountInfo *get.Query,
	groupTransactionsQuery *groupTransactions.Query,
	logger *zap.Logger,
) *Api {
	return &Api{
		getAccountInfoQuery:    getAccountInfo,
		groupTransactionsQuery: groupTransactionsQuery,
		logger:                 logger,
	}
}

func (a Api) Register(e *echo.Echo) http.Handler {
	v2 := e.Group("/api/v2")
	v2.GET("/graph/:address", a.getAccountInfo)
	v2.GET("/transaction/:address/group", a.groupTransactions)

	return e
}

const defaultBlockchain = "ethereum"

func (a Api) getAccountInfo(c echo.Context) error {
	address := c.Param("address")
	if address == "" {
		return echo.ErrNotFound
	}

	blockchain := c.QueryParam("blockchain")
	if blockchain == "" {
		blockchain = defaultBlockchain
	}

	dmAccount, err := a.getAccountInfoQuery.Execute(
		c.Request().Context(),
		blockchain,
		address,
		10,
	)
	if err != nil {
		a.logger.Error(
			"error in get account info",
			zap.Error(err),
			zap.String("address", address),
		)
		return echo.NewHTTPError(echo.ErrInternalServerError.Code, err.Error())
	}

	resp := account.NewApiMapper(dmAccount).ToResponse()

	a.logger.Info(
		"success get account info request",
		zap.String("address", address),
		zap.String("blockchain", blockchain),
	)
	return c.JSON(http.StatusOK, resp)
}

func (a Api) groupTransactions(c echo.Context) error {
	address := c.Param("address")
	if address == "" {
		return echo.ErrNotFound
	}

	blockchain := c.QueryParam("blockchain")
	if blockchain == "" {
		blockchain = defaultBlockchain
	}

	transactionGroup, err := a.groupTransactionsQuery.Execute(c.Request().Context(), address, blockchain)
	if err != nil {
		a.logger.Error(
			"error in get transaction group query",
			zap.Error(err),
			zap.String("address", address),
		)
		return echo.NewHTTPError(echo.ErrInternalServerError.Code, err.Error())
	}

	resp := group.NewApiMapper(transactionGroup).ToResponse()

	return c.JSON(http.StatusOK, resp)
}
