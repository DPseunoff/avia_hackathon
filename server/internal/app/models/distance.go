package models

import (
	"github.com/starwander/goraph"
	"sort"
)

type Distance struct {
	SourcePoint string
	TargetPoint string
	Length      int
}

// Создание графа на основе таблицы расстояний
func CreateGraph(d []Distance) *goraph.Graph {
	graph := goraph.NewGraph()
	distinctPoints := GetDistinctPoints(d)
	for _, point := range distinctPoints {
		graph.AddVertex(point, nil)
	}
	for _, elem := range(d) {
		graph.AddEdge(elem.SourcePoint, elem.TargetPoint, float64(elem.Length), nil)
	}
	return graph
}

// Получаем список уникальных вершин графа по порядку
func GetDistinctPoints(d []Distance) []string {
	var points []string
	set := make(map[string]int)
	for _, elem := range d {
		set[elem.SourcePoint] = 1
		set[elem.TargetPoint] = 1
	}
	for point, _ := range set {
		points = append(points, point)
	}
	sort.Strings(points)
	return points
}