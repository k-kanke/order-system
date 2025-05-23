package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type Menu struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func main() {
	db, err := sql.Open("postgres", "host=db user=dev password=devpass dbname=order_dev sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	http.HandleFunc("/menus", func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, name FROM menus")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var menus []Menu
		for rows.Next() {
			var m Menu
			if err := rows.Scan(&m.ID, &m.Name); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			menus = append(menus, m)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(menus)
	})

	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
