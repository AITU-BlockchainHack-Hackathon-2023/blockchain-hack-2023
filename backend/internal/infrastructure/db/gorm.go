package db

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

func Connect(cfg Config) (*gorm.DB, error) {
	if err := cfg.Validate(); err != nil {
		return nil, fmt.Errorf("database config is invalid: %w", err)
	}

	dbLogger := logger.Default.LogMode(logger.Silent)

	if cfg.EnableLogger {
		dbLogger = dbLogger.LogMode(logger.Info)
	}

	gormCfg := gorm.Config{
		SkipDefaultTransaction: true,
		NamingStrategy:         schema.NamingStrategy{SingularTable: true},
		Logger:                 dbLogger,
	}

	dsn := postgres.Open(fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		cfg.Host,
		cfg.Port,
		cfg.Username,
		cfg.Password,
		cfg.DBName,
	))

	db, err := gorm.Open(dsn, &gormCfg)
	if err != nil {
		return nil, fmt.Errorf("connect to database: %w", err)
	}

	return db, nil
}
