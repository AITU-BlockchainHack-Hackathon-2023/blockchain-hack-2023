package main

import (
	"context"
	"time"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/adapter/ethplorer"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/adapter/oraclus"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/http/client"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/http/server"
	localZap "github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/logger/zap"
	v1 "github.com/Levap123/blockchain-hack-2023/backend/internal/transport/http/v1"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/usecase/graph/account/get"
	"go.uber.org/zap"
)

func main() {
	logger := localZap.New(localZap.Config{
		DevMode:   true,
		Directory: "logs",
	})

	cl, err := client.New(context.Background(), client.Config{})
	if err != nil {
		logger.Fatal(
			"new client",
			zap.Error(err),
		)
	}

	oraclusManager, err := oraclus.New(cl, logger.Named("AccountManager"))
	if err != nil {
		logger.Fatal(
			"new oraclus manager",
			zap.Error(err),
		)
	}

	ethplorerManager, err := ethplorer.New(cl, logger.Named("EthplorerManager"))
	if err != nil {
		logger.Fatal(
			"new ethplorer manager",
			zap.Error(err),
		)
	}

	getAccountQuery, err := get.New(oraclusManager, ethplorerManager, logger.Named("GetAccountQuery"))
	if err != nil {
		logger.Fatal(
			"new get account query",
			zap.Error(err),
		)
	}

	api := v1.New(getAccountQuery, logger.Named("V1API"))
	if err != nil {
		logger.Fatal(
			"new get account query",
			zap.Error(err),
		)
	}

	srv, err := server.New(server.Config{
		Host:              "0.0.0.0",
		Port:              "8080",
		ReadHeaderTimeout: time.Second * 30,
		Handler:           api.Register(),
	})
	if err != nil {
		logger.Fatal(
			"new server",
			zap.Error(err),
		)
	}

	if err := srv.ListenAndServe(); err != nil {
		logger.Fatal(
			"listen and server",
			zap.Error(err),
		)
	}
}
