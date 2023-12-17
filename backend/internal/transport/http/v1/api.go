package v1

import (
	"net/http"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/transport/http/v1/get/account"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/usecase/account/get"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type Api struct {
	getAccountInfoQuery *get.Query

	logger *zap.Logger
}

func New(getAccountInfo *get.Query, logger *zap.Logger) *Api {
	return &Api{
		getAccountInfoQuery: getAccountInfo,
		logger:              logger,
	}
}

func (a Api) Register() http.Handler {
	e := echo.New()

	v1 := e.Group("/api/v1")
	v1.GET("/graph/:address", a.getAccountInfo)

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
		10)
	if err != nil {
		a.logger.Error(
			"error in get account info",
			zap.Error(err),
			zap.String("address", address),
		)
		return echo.NewHTTPError(echo.ErrInternalServerError.Code, err.Error())
	}

	mapper := account.NewApiMapper(dmAccount)

	a.logger.Info(
		"success get account info request",
		zap.String("address", address),
		zap.String("blockchain", blockchain),
	)
	return c.JSON(http.StatusOK, mapper.ToResponse())
}
