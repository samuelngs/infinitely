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
	API         *API
	Conf        *config.Config
	Engine      *gin.Engine
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
    if !options.Verbose {
		gin.SetMode(gin.ReleaseMode)
    }

	// Make an engine
	engine := gin.Default()

	// Initialize the application
	app := &App{
		API:    &API{},
		Conf:   conf,
		Engine: engine,
	}

    // Load embedded templates
    app.Engine.SetHTMLTemplate(
        binhtml.New(options.Asset, options.AssetDir).MustLoadDirectory("templates"),
    )
    // Define routes and middlewares
    app.Engine.StaticFS("/static", &assetfs.AssetFS{
        Asset:    options.Asset,
        AssetDir: options.AssetDir,
        Prefix:   "static",
    })

	// Map app struct to access from request handlers
	// and middlewares
	app.Engine.Use(func(c *gin.Context) {
		c.Set("app", app)
	})

    app.Engine.GET("/favicon.ico", func(c *gin.Context) {
		c.Redirect(301, "/static/images/favicon.ico")
	})

    // Bind api hadling for URL api.prefix
	app.API.Bind(
		app.Engine.Group(
			app.Conf.UString("api.prefix"),
		),
	)

    return app

}

func (app *App) init() {
    numCPU := runtime.NumCPU()
    runtime.GOMAXPROCS(numCPU)
    fmt.Printf("Running with %d CPUs\n and PORT %d", numCPU, app.Conf.UString("port"))
}

func (app *App) Run() *App {
	Must(app.Engine.Run(":" + app.Conf.UString("port")))
    return app
}

func (app *App) WebSocket() *App {
    ws := &WebSocket{}
    ws.Bind(app)
    return app
}

func (app *App) AttachRoutes(routes map[string] *Route) *App {
    for _, r := range routes {
        app.AddRoute(r)
    }
    return app
}

func (app *App) AddRoute(route *Route) *App {
    switch {
    case route.Method == "GET":
        app.Engine.GET(route.URI, route.Callback)
    case route.Method == "POST":
        app.Engine.POST(route.URI, route.Callback)
    case route.Method == "PUT":
        app.Engine.PUT(route.URI, route.Callback)
    case route.Method == "PATCH":
        app.Engine.PATCH(route.URI, route.Callback)
    case route.Method == "DELETE":
        app.Engine.DELETE(route.URI, route.Callback)
    case route.Method == "OPTIONS":
        app.Engine.OPTIONS(route.URI, route.Callback)
    }
    fmt.Printf("[Route] %s >> %s\n", route.Method, route.URI)
    return app
}
