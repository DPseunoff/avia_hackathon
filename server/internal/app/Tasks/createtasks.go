package Tasks

import (
	"math"
	"time"

	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/models"
)

func CreateTasks(flights []models.Flight, buses []models.Bus, d []models.Distance) error {
	flag := true
	for flag {
		count := 0 // число автобусов, для которых не нашлось заданий
		// Если  count после цикла по автобусам равно числу автобусов, то завершаем подбор задач (flag = false)
		for i, bus := range buses {
			var busLastTask models.Task // последняя задача автобуса в списке
			if len(bus.Tasks) != 0 {
				busLastTask = bus.Tasks[len(bus.Tasks)-1]
			} else {
				busLastTask = models.Task{
					Id:        0,
					Action:    "",
					Type:      "",
					TimeStart: time.Date(2019, 8, 24, 0, 0, 0, 0, time.Local), // при настоящих данных, нужно заменить на time.Now()
					Route: models.Route{
						From:          "",
						To:            bus.Location,
						TimeToExecute: 0,
					},
				}
			}
			busCompleteTaskTime := busLastTask.TimeStart.Add(time.Duration(busLastTask.Route.TimeToExecute) * time.Minute) // время окончания последней задачи автобуса
			// Ищем минимальные расстояния от текущего автобуса до всех точек
			graph := models.CreateGraph(d)
			minDist, _, err := graph.Dijkstra(busLastTask.Route.To)
			if err != nil {
				return err
			}

			for point, dist := range minDist {
				if dist == math.Inf(1) {
					minDist[point] = 500
				}
			}

			// Ищем ближайший подходящий рейс для автобуса
			bestFlightIndex := -1
			minTime := time.Date(2100, 1, 1, 0, 0, 0, 0, time.Local)

			for point, dist := range minDist {
				for i, flight := range flights {
					// время начала новой задачи
					startTaskTime := flight.DateTime
					if flight.AD == "D" {
						startTaskTime = startTaskTime.Add(-30 * time.Minute)
					}
					// Проверки, подходит ли рейс
					if flight.Passengers <= 0 ||
						flight.Parking != point ||
						startTaskTime.Before(busCompleteTaskTime.Add(time.Duration(int(dist)/500)*time.Minute)) ||
						minTime.Before(startTaskTime) {
						continue
					}
					bestFlightIndex = i
				}
			}
			if bestFlightIndex == -1 {
				count++
				continue
			}
			flights[bestFlightIndex].Passengers -= bus.Capacity
			// Определяем данные задачи
			startTaskTime := flights[bestFlightIndex].DateTime
			from := flights[bestFlightIndex].Parking
			to := flights[bestFlightIndex].Gate
			if flights[bestFlightIndex].AD == "D" {
				startTaskTime = startTaskTime.Add(-30 * time.Minute)
				from = flights[bestFlightIndex].Gate
				to = flights[bestFlightIndex].Parking
			}
			// Находим кратчайшее расстояниеот пунка выезда до пункта назначения
			minDistFromTo, _, err := graph.Dijkstra(from)
			if err != nil {
				return err
			}
			for point, dist := range minDistFromTo {
				if dist == math.Inf(1) {
					minDistFromTo[point] = 500
				}
			}

			// Добавляем задачу автобусу
			buses[i].Tasks = append(buses[i].Tasks, models.Task{
				Id:        0,
				Action:    flights[bestFlightIndex].AD,
				Type:      "queue",
				TimeStart: startTaskTime,
				Route: models.Route{
					From:          from,
					To:            to,
					TimeToExecute: 10 + (int(minDistFromTo[to]) / 500) + 5,
				},
			})
		}
		if count == len(buses) {
			flag = false
		}
	}
	return nil
}

func RemoveTasks(buses []models.Bus) {
	for i, _ := range buses {
		for j, _ := range buses[i].Tasks {
			if buses[i].Tasks[j].Type == "in progress" {
				buses[i].Tasks = buses[i].Tasks[j:]
				break
			}
		}
	}
}
