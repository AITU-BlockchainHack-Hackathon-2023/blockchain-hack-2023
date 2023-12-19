package db

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestConfig_Validate(t *testing.T) {
	tests := []struct {
		name     string
		username string
		password string
		host     string
		port     int
		dbName   string
		wantErr  bool
	}{
		{
			name:     "empty username",
			password: "password",
			host:     "host",
			port:     5432,
			dbName:   "dbname",
			wantErr:  true,
		},
		{
			name:     "empty password",
			username: "username",
			host:     "host",
			port:     5432,
			dbName:   "dbname",
			wantErr:  true,
		},
		{
			name:     "empty host",
			username: "username",
			password: "password",
			port:     5432,
			dbName:   "dbname",
			wantErr:  true,
		},
		{
			name:     "empty port",
			username: "username",
			password: "password",
			host:     "host",
			dbName:   "dbname",
			wantErr:  true,
		},
		{
			name:     "empty dbname",
			username: "username",
			password: "password",
			host:     "host",
			port:     5432,
			wantErr:  true,
		},
		{
			name:     "valid config",
			username: "username",
			password: "password",
			host:     "host",
			port:     5432,
			dbName:   "dbname",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			cfg := Config{
				Username: tt.username,
				Password: tt.password,
				Host:     tt.host,
				Port:     tt.port,
				DBName:   tt.dbName,
			}

			err := cfg.Validate()

			if tt.wantErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestConfig_Address(t *testing.T) {
	expected := "localhost:5432"

	cfg := Config{
		Host: "localhost",
		Port: 5432,
	}

	require.Equal(t, expected, cfg.Address())
}
