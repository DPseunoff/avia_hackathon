package models

import "time"

type Flight struct {
	ID         int
	DateTime   time.Time
	AD         string
	Gate       string
	Parking    string
	Passengers int
}
