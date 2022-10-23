package main

import (
	"log"

	"github.com/GrishaSkurikhin/Aviahackathon/internal/app/apiserver"
	"github.com/GrishaSkurikhin/Aviahackathon/pkg/Config"
)

func main() {
	config, err := Config.LoadConfig(Config.ParseFlag())
	if err != nil {
		log.Fatal(err)
	}

	srv := apiserver.NewServer()
	log.Fatal(srv.Start(config))
	defer srv.Close()

}
