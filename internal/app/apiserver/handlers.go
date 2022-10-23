package apiserver

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/Tasks"
	"github.com/gin-gonic/gin"
)

type responseTasks struct {
	BusID         int    `json:"BusID"`
	DriverName    string `json:"DriverName"`
	Action        string `json:"Action"`
	Type          string `json:"Type"`
	TimeStart     string `json:"TimeStart"`
	TimeToExecute int    `json:"TimeToExecute"`
	From          string `json:"From"`
	To            string `json:"To"`
}

type responseFlights struct {
	ID         int    `json:"id"`
	DateTime   string `json:"time"`
	AD         string `json:"AD"`
	Gate       string `json:"gate"`
	Parking    string `json:"parking"`
	Passengers int    `json:"passenger_num"`
}

type responseBuses struct {
	ID       int    `json:"BusID"`
	Name     string `json:"name"`
	Capacity int    `json:"capacity"`
	Status   string `json:"status"`
}

func (srv *Server) getTasks(c *gin.Context) {
	//Обновляем расписание
	var err error
	srv.Data.Flights, err = srv.Airport.GetFlights()
	if err != nil {
		c.Writer.WriteHeader(500)
		fmt.Fprintf(c.Writer, err.Error())
		return
	}
	// Убираем очередь задач и создаем новую на основе обновленного расписания
	Tasks.RemoveTasks(srv.Data.Buses)
	Tasks.CreateTasks(srv.Data.Flights, srv.Data.Buses, srv.Data.Distances)

	// Выбираем все существующие задачи и отправляем диспетчеру
	var respSlice []responseTasks
	for _, bus := range srv.Data.Buses {
		for _, task := range bus.Tasks {
			respSlice = append(respSlice, responseTasks{
				BusID:         bus.ID,
				DriverName:    bus.Name,
				Action:        task.Action,
				Type:          task.Type,
				TimeStart:     task.TimeStart.String(),
				TimeToExecute: task.Route.TimeToExecute,
				From:          task.Route.From,
				To:            task.Route.To,
			})
		}
	}
	responseEncoder := json.NewEncoder(c.Writer)
	responseEncoder.Encode(respSlice)
}

func (srv *Server) getBusTasks(c *gin.Context) {
	type uri struct {
		id string `uri:"id"`
	}

	var busID uri
	if err := c.BindUri(&busID); err != nil {
		c.Writer.WriteHeader(400)
		fmt.Fprintf(c.Writer, err.Error())
		return
	}

	id, err := strconv.Atoi(busID.id)
	if err != nil {
		c.Writer.WriteHeader(500)
		fmt.Fprintf(c.Writer, err.Error())
		return
	}

	var respSlice []responseTasks
	for _, bus := range srv.Data.Buses {
		if bus.ID == id {
			for _, task := range bus.Tasks {
				respSlice = append(respSlice, responseTasks{
					BusID:         bus.ID,
					DriverName:    bus.Name,
					Action:        task.Action,
					Type:          task.Type,
					TimeStart:     task.TimeStart.String(),
					TimeToExecute: task.Route.TimeToExecute,
					From:          task.Route.From,
					To:            task.Route.To,
				})
			}
			break
		}
	}

	responseEncoder := json.NewEncoder(c.Writer)
	responseEncoder.Encode(respSlice)
}

func (srv *Server) getFlights(c *gin.Context) {
	var respSlice []responseFlights
	for _, flight := range srv.Data.Flights {
		respSlice = append(respSlice, responseFlights{
			ID:         flight.ID,
			DateTime:   flight.DateTime.String(),
			AD:         flight.AD,
			Gate:       flight.Gate,
			Parking:    flight.Parking,
			Passengers: flight.Passengers,
		})
	}
	responseEncoder := json.NewEncoder(c.Writer)
	responseEncoder.Encode(respSlice)
}

func (srv *Server) getBuses(c *gin.Context) {
	var respSlice []responseBuses
	for _, bus := range srv.Data.Buses {
		respSlice = append(respSlice, responseBuses{
			ID:       bus.ID,
			Name:     bus.Name,
			Capacity: bus.Capacity,
			Status:   bus.Status,
		})
	}

	responseEncoder := json.NewEncoder(c.Writer)
	responseEncoder.Encode(respSlice)
}

func (srv *Server) changeTask(c *gin.Context) {

}

func (srv *Server) startTask(c *gin.Context) {

}

func (srv *Server) completeTask(c *gin.Context) {

}
