package db

import (
	"errors"
	"fmt"
)

type Config struct {
	Username     string
	Password     string
	Host         string
	Port         int
	DBName       string
	EnableLogger bool
}

func (c Config) Address() string {
	return fmt.Sprintf("%s:%d", c.Host, c.Port)
}

func (c Config) Validate() error {
	if c.Username == "" {
		return errors.New("username is empty")
	}

	if c.Password == "" {
		return errors.New("password is empty")
	}

	if c.Host == "" {
		return errors.New("host is empty")
	}

	if c.Port == 0 {
		return errors.New("port is empty")
	}

	if c.DBName == "" {
		return errors.New("database name is empty")
	}

	return nil
}
