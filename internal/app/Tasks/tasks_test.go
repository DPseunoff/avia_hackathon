package Tasks

import (
	"testing"

	sqlAirport "github.com/GrishaSkurikhin/Aviahackathon/internal/app/Airport"
	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/models"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/Config"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/PostgreSQL"
	"github.com/stretchr/testify/assert"
)

func connect() *sqlAirport.Airport {
	config, _ := Config.LoadConfig("./../../../config.yaml")
	airport := sqlAirport.NewAirport(PostgreSQL.NewDB(
		config.DBHost,
		config.DBPort,
		config.DBUser,
		config.DBPassword,
	))

	airport.DB.Open("BusManagement")
	return airport
}

func TestCreateTasks(t *testing.T) {
	airport := connect()
	flights, _ := airport.GetFlights()
	distances, _ := airport.GetDistances()
	buses := models.NewBuses(distances)

	err := CreateTasks(flights, buses, distances)
	assert.Equal(t, nil, err)
}
