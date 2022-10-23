package Config

import (
	"flag"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

type Config struct {
	ServerAddr string `yaml:"server_addr"`
	DBHost     string `yaml:"db_host"`
	DBPort     string `yaml:"db_port"`
	DBUser     string `yaml:"db_user"`
	DBPassword string `yaml:"db_password"`
}

func NewConfig() *Config {
	return &Config{
		ServerAddr: "",
		DBHost:     "",
		DBPort:     "",
		DBUser:     "",
		DBPassword: "",
	}
}

func LoadConfig(path string) (*Config, error) {
	config := NewConfig()
	yamlFile, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}
	err = yaml.Unmarshal(yamlFile, config)
	if err != nil {
		return nil, err
	}
	return config, nil
}

func ParseFlag() string {
	var configPath = flag.String("config", "config.yaml", "config path")
	flag.Parse()
	return *configPath
}
