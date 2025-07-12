package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/db"
)

type OrderHistory struct {
	ID        int    `json:"id"`
	TableID   string `json:"table_id"`
	ItemName  string `json:"item_name"`
	Count     int    `json:"count"`
	CreatedAt string `json:"created_at"`
}

func GetOrderHistory(c *gin.Context) {
	// TODO: テーブルIDをクエリから取得したい場合
	// tableID := c.Query("table_id")

	rows, err := db.Pool.Query(context.Background(),
		`SELECT id, table_id, item_name, count, created_at FROM orders ORDER BY created_at DESC`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query orders"})
		return
	}
	defer rows.Close()

	var orders []OrderHistory
	for rows.Next() {
		var o OrderHistory
		if err := rows.Scan(&o.ID, &o.TableID, &o.ItemName, &o.Count, &o.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan row"})
			return
		}
		orders = append(orders, o)
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}
