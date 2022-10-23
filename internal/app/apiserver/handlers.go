package apiserver

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/Tasks"
	"github.com/gin-gonic/gin"
)

type response struct {
	BusID         int    `json:"BusID"`
	DriverName    string `json:"DriverName"`
	Action        string `json:"Action"`
	Type          string `json:"Type"`
	TimeStart     string `json:"TimeStart"`
	TimeToExecute int    `json:"TimeToExecute"`
	From          string `json:"From"`
	To            string `json:"To"`
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
	var respSlice []response
	for _, bus := range srv.Data.Buses {
		for _, task := range bus.Tasks {
			respSlice = append(respSlice, response{
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
	type busID struct {
		id   string `uri:"id" binding:"required,uuid"`
	}

	var busid busID
	if err := c.ShouldBindUri(&busid); err != nil {
		c.Writer.WriteHeader(500)
		fmt.Fprintf(c.Writer, err.Error())
		return
	}
	
	id, err := strconv.Atoi(busid.id)
	if err != nil {
		c.Writer.WriteHeader(500)
		fmt.Fprintf(c.Writer, err.Error())
		return
	}

	var respSlice []response
	for _, bus := range srv.Data.Buses {
		if bus.ID == id {
			for _, task := range bus.Tasks {
				respSlice = append(respSlice, response{
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

}

func (srv *Server) getDrivers(c *gin.Context) {

}

func (srv *Server) changeTask(c *gin.Context) {

}

func (srv *Server) startTask(c *gin.Context) {

}

func (srv *Server) completeTask(c *gin.Context) {

}
