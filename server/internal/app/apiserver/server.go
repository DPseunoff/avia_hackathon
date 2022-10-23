package apiserver

import (
	sqlAirport "github.com/GrishaSkurikhin/Aviahackathon/internal/app/Airport"
	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/models"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/Config"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/PostgreSQL"

	"github.com/gin-gonic/gin"
)

type Server struct {
	Addr    string
	Router  *gin.Engine
	Airport *sqlAirport.Airport
	Data    data
}

type data struct {
	Buses     []models.Bus
	Flights   []models.Flight
	Distances []models.Distance
}

func NewServer() *Server {
	return &Server{
		Addr:    "",
		Router:  gin.Default(),
		Airport: nil,
		Data: data{
			Buses:     nil,
			Flights:   nil,
			Distances: nil,
		},
	}
}

func (srv *Server) Start(config *Config.Config) error {
	srv.Airport = sqlAirport.NewAirport(PostgreSQL.NewDB(
		config.DBHost,
		config.DBPort,
		config.DBUser,
		config.DBPassword,
	))
	err := srv.Airport.DB.Open("BusManagement")
	if err != nil {
		return err
	}

	srv.Data.Distances, err = srv.Airport.GetDistances()
	if err != nil {
		return err
	}

	srv.Data.Flights, err = srv.Airport.GetFlights()
	if err != nil {
		return err
	}

	srv.Data.Buses = models.NewBuses(srv.Data.Distances)

	srv.Addr = config.ServerAddr
	srv.createRoutes()
	err = srv.Router.Run(srv.Addr)
	if err != nil {
		return err
	}
	return nil
}

func (srv *Server) Close() {
	srv.Airport.DB.Close()
}
