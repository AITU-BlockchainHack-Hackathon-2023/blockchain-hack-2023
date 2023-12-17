package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Levap123/blockchain-hack-2023/backend/internal/adapter/ethplorer"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/adapter/oraclus"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/http/client"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/http/server"
	localZap "github.com/Levap123/blockchain-hack-2023/backend/internal/infrastructure/logger/zap"
	v1 "github.com/Levap123/blockchain-hack-2023/backend/internal/transport/http/v1"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/usecase/account/get"
	"github.com/Levap123/blockchain-hack-2023/backend/internal/usecase/transaction/group"
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

	groupTransactionsQuery, err := group.New(ethplorerManager, logger.Named("GroupTransactionQuery"))
	if err != nil {
		logger.Fatal(
			"new group transaction query",
			zap.Error(err),
		)
	}

	api := v1.New(getAccountQuery, groupTransactionsQuery, logger.Named("V1API"))
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

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			if errors.Is(err, http.ErrServerClosed) {
				logger.Info("http server is closed")

				return
			}

			logger.Error("listen and serve", zap.Error(err))

			return
		}

	}()

	logger.Info("service started", zap.String("address", srv.Addr))

	defer func() {
		// Application should flush all buffered log entries.
		if err := logger.Sync(); err != nil {
			logger.Error("logger sync", zap.Error(err))

			return
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the service with a timeout of 10 seconds.
	// Use a buffered channel to avoid missing signals as recommended for signal.Notify
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	<-sigs

	logger.Info("service shutdown requested")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil && !errors.Is(err, context.Canceled) {
		logger.Fatal(
			"shutdown err",
			zap.Error(fmt.Errorf("health/readiness probes shutdown: %w", err)),
		)
	}

}
