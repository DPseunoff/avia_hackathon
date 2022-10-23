package PostgreSQL

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

type DB struct {
	host     string
	port     string
	user     string
	password string
	Connect  *sql.DB
}

func NewDB(host, port, user, password string) *DB {
	return &DB{
		host:     host,
		port:     port,
		user:     user,
		password: password,
		Connect:  nil,
	}
}

// Подключение к базе данных
func (db *DB) Open(DBName string) error {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		db.host, db.port, db.user, db.password, DBName)
	connect, err := sql.Open("postgres", connStr)
	if err != nil {
		return err
	}
	db.Connect = connect

	if err = db.Connect.Ping(); err != nil {
		return err
	}
	return nil
}

// Закрытие соединения с базой данных
func (db *DB) Close() {
	db.Connect.Close()
}
