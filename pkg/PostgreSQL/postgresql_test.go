package PostgreSQL

import (
	"testing"

	"github.com/GrishaSkurikhin/Aviahackathon/pkg/Config"
	"github.com/stretchr/testify/assert"
)

func TestOpen(t *testing.T) {
	config, _ := Config.LoadConfig("./../../config.yaml")
	DB := NewDB(
		config.DBHost,
		config.DBPort,
		config.DBUser,
		config.DBPassword,
	)

	err := DB.Open("BusManagement")
	assert.Equal(t, nil, err)
	DB.Close()
}
