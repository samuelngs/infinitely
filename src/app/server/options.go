package server

type AppOptions struct {
	Config string
	Asset func(path string) ([]byte, error)
	AssetDir func(path string) ([]string, error)
}

func (ao *AppOptions) init() {
    // Set default to development
	if ao.Config == "" {
		ao.Config = "development"
	}
}

