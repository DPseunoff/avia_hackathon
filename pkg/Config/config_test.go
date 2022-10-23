package Config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoadConfig(t *testing.T) {
	_, err := LoadConfig("D:/Go/Aviahackathon/config.yaml")
	assert.Equal(t, nil, err)
}
