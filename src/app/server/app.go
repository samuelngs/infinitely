package server

import (
    "fmt"
    "runtime"

    "github.com/gin-gonic/gin"
    "github.com/infinitelyio/go-bindata-assetfs"
    "github.com/infinitelyio/go-bindata-templates"
    "github.com/infinitelyio/config"
)

// App struct.
type App struct {
	Engine      *gin.Engine
    WebSocket   *WebSocket
	Conf        *config.Config
	API         *API
}

func Create(opts ...AppOptions) *App {
    options := AppOptions{}
	for _, i := range opts {
		options = i
		break
	}
	options.init()

	// Parse config yaml string from ./conf.go
	conf, err := config.ParseYaml(confs)
	Must(err)
	// Choise a config section by given string
	conf, err = conf.Get(options.Config)
	Must(err)

	// Parse environ variables for defined
	// in config constants
	conf.Env()

	// Set up gin
	if !conf.UBool("debug") {
		gin.SetMode(gin.ReleaseMode)
	}

	// Make an engine
	engine := gin.Default()

	// Initialize the application
	app := &App{
		Conf:   conf,
		Engine: engine,
		API:    &API{},
	}

    if options.Asset != nil && options.AssetDir != nil {

        // Define routes and middlewares
        app.Engine.StaticFS("/static", &assetfs.AssetFS{
            Asset:    options.Asset,
            AssetDir: options.AssetDir,
            Prefix:   "static",
        })

        // Load embedded templates
        app.Engine.SetHTMLTemplate(
            binhtml.New(options.Asset, options.AssetDir).MustLoadDirectory("templates"),
        )

    }

    // Bind api hadling for URL api.prefix
	app.API.Bind(
		app.Engine.Group(
			app.Conf.UString("api.prefix"),
		),
	)

	// Map app struct to access from request handlers
	// and middlewares
	app.Engine.Use(func(c *gin.Context) {
		c.Set("app", app)
	})

    app.Engine.GET("/favicon.ico", func(c *gin.Context) {
		c.Redirect(301, "/static/images/favicon.ico")
	})

    return app

}

func (app *App) init() {
    numCPU := runtime.NumCPU()
    runtime.GOMAXPROCS(numCPU)
    fmt.Printf("Running with %d CPUs\n and PORT %d", numCPU, app.Conf.UString("port"))
}

func (app *App) Run() {
	Must(app.Engine.Run(":" + app.Conf.UString("port")))
}

