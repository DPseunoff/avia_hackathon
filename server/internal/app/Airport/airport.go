package sqlAirport

import (
	"fmt"
	"strings"
	"time"

	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/models"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/PostgreSQL"
)

type Airport struct {
	DB *PostgreSQL.DB
}

func NewAirport(db *PostgreSQL.DB) *Airport {
	return &Airport{
		DB: db,
	}
}

// Получение рейсов из базы данных
func (a *Airport) GetFlights() ([]models.Flight, error) {
	var flights []models.Flight
	rows, err := a.DB.Connect.Query(`SELECT * FROM "Flights"`)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		f := new(models.Flight)
		var date time.Time
		var t time.Time
		err = rows.Scan(&f.ID, &date, &f.AD, &t, &f.Gate, &f.Parking, &f.Passengers)
		if err != nil {
			return nil, err
		}
		f.DateTime = time.Date(date.Year(), date.Month(), date.Day(), t.Hour(), t.Minute(), 0, 0, time.Local)
		f.Gate = strings.ReplaceAll(f.Gate, " ", "")
		f.Parking = strings.ReplaceAll(f.Parking, " ", "")
		flights = append(flights, *f)
	}
	b := flights[0].DateTime.String()
	fmt.Println(b)
	return flights, nil
}

// Получение таблицы расстояний между точками
func (a *Airport) GetDistances() ([]models.Distance, error) {
	var dist []models.Distance
	rows, err := a.DB.Connect.Query(
		`SELECT DISTINCT ON (p1.location_id, p2.location_id)
			p1.location_id AS source_point,
			p2.location_id AS target_point,
			distance
		FROM
			"Roads" AS r
			INNER JOIN "Points" AS p1 ON r.source_point_id = p1.point_id
			INNER JOIN "Points" AS p2 ON r.target_point_id = p2.point_id
		ORDER BY source_point ASC;`)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		d := new(models.Distance)
		err = rows.Scan(&d.SourcePoint, &d.TargetPoint, &d.Length)
		d.SourcePoint = strings.ReplaceAll(d.SourcePoint, " ", "")
		d.TargetPoint = strings.ReplaceAll(d.TargetPoint, " ", "")
		if err != nil {
			return nil, err
		}
		dist = append(dist, *d)
	}

	return dist, nil
}
