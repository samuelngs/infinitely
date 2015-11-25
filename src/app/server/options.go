package server

type AppOptions struct {
	Asset		func(path string) ([]byte, error)
	AssetDir	func(path string) ([]string, error)
	Config		string
    Verbose		bool
}

func (ao *AppOptions) init() {
    // Set default to production
	if ao.Config == "" {
		ao.Config = "production"
	}
}

