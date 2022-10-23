package Config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoadConfig(t *testing.T) {
	_, err := LoadConfig("./../../config.yaml")
	assert.Equal(t, nil, err)
}
