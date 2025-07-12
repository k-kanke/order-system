package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var Pool *pgxpool.Pool

func Init() error {
	_ = godotenv.Load()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		return fmt.Errorf("DATABASE_URL not set")
	}

	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return fmt.Errorf("failed to parse DATABASE_URL: %w", err)
	}

	pool, err := pgxpool.New(context.Background(), config.ConnString())
	if err != nil {
		return fmt.Errorf("failed to connect to Supabase: %w", err)
	}

	Pool = pool
	fmt.Println("[DB] Connected to Supabase")
	return nil
}
