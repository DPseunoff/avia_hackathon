package sqlAirport

import (
	"testing"

	"github.com/GrishaSkurikhin/Aviahackathon/pkg/Config"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/PostgreSQL"
	"github.com/stretchr/testify/assert"
)

func connect() *Airport {
	config, _ := Config.LoadConfig("./../../../config.yaml")
	airport := NewAirport(PostgreSQL.NewDB(
		config.DBHost,
		config.DBPort,
		config.DBUser,
		config.DBPassword,
	))

	airport.DB.Open("BusManagement")
	return airport
}

func TestGetFlights(t *testing.T) {
	airport := connect()
	defer airport.DB.Close()
	flights, err := airport.GetFlights()
	assert.Equal(t, nil, err)
	assert.NotEmpty(t, flights)
}

func TestGetDistances(t *testing.T) {
	airport := connect()
	defer airport.DB.Close()
	dist, err := airport.GetDistances()
	assert.Equal(t, nil, err)
	assert.NotEmpty(t, dist)
}
