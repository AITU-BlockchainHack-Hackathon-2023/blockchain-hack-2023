package client

import (
	"context"
	"net/http"
)

// TODO: add configuration
func New(ctx context.Context, _ Config) (*http.Client, error) {
	return http.DefaultClient, nil
}
