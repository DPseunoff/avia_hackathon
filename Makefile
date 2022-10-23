BINARY_NAME=apiserver.exe
 
.PHONY: build
build:
	go build -v ./cmd/apiserver

.PHONY: test
test:
	go test -v -race -timeout 30s ./...

.PHONY: run
run:
	go run ./cmd/apiserver

.PHONY: start
start:
	${BINARY_NAME}

.DEFAULT_GOAL := build
