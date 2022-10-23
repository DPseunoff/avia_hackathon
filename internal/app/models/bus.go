package models

import (
	"math/rand"
	"time"
)

type Bus struct {
	ID       int
	Capacity int
	Tasks    []Task
	Name     string
	Status   string //в работе или нет
	Location string // последнее местоположение
}

type Task struct {
	Id        int
	Action    string //загрузка или разгрузка
	Type      string //в очереди, выполнено, в процессе
	TimeStart time.Time
	Route     Route
}

type Route struct {
	From          string
	To            string
	TimeToExecute int //время выполнения в минутах
}

func NewBuses(d []Distance) []Bus {
	distinctPoints := GetDistinctPoints(d)
	var buses []Bus
	for i := 0; i < 30; i++ {
		buses = append(buses, Bus{
			ID:       i,
			Capacity: 50,
			Tasks:    []Task{},
			Name:     "1",
			Status:   "resting",
			Location: distinctPoints[rand.Intn(len(distinctPoints))],
		})
	}
	for i := 30; i < 40; i++ {
		buses = append(buses, Bus{
			ID:       i,
			Capacity: 100,
			Tasks:    []Task{},
			Name:     "1",
			Status:   "resting",
			Location: distinctPoints[rand.Intn(len(distinctPoints))],
		})
	}
	return buses
}
