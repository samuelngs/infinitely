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
    WebSocket   *WebSocket
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

    // Redirect favicon url
    app.Engine.GET("/favicon.ico", func(c *gin.Context) {
        c.Redirect(301, "/static/images/favicon.png")
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

func (app *App) AttachWS() *App {
    app.WebSocket = CreateWebSocket()
    app.WebSocket.Bind(app)
    return app
}

func (app *App) AttachRoutes(args ...[]*Route) *App {
    for _, arg := range args {
        for _, r := range arg {
            app.Engine.Handle(r.Method, r.URI, func(c *gin.Context) {
                r.Callback(app, c)
            })
        }
    }
    return app
}

