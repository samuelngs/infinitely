package main

import (
    "fmt"
	"os"

    "app/server"
    "app/routes"

    "github.com/infinitelyio/cli"
)

func main() {
    Run(os.Args)
}

func Run(args []string) {

    app := cli.NewApp()
	app.Name = "infinitely"
	app.Usage = "A Re-brand infinitely written in GoLang"

    verboseFlag := cli.BoolFlag{
        Name:  "verbose, v",
        Usage: "Enable verbose logging",
    }

    app.Commands = []cli.Command{
		{
			Name:   "start",
			Usage:  "Runs server",
			Action: RunServer,
            Flags:  []cli.Flag{verboseFlag},
		},
		{
			Name:    "version",
			Aliases: []string{"v"},
			Usage:   "Prints app's version",
			Action:  Version,
		},
	}

    app.Run(args)

}

func RunServer(c *cli.Context) {

    app := server.Create(server.AppOptions{
        Asset: Asset,
        AssetDir: AssetDir,
        Verbose: c.Bool("verbose"),
	})

	app.WebSocket()
    app.AttachRoutes(routes.HomeRoute)
    app.Run()
}

var githash, gittag, buildstamp string

func Version(c *cli.Context) {
	fmt.Printf(`Git tag: %s
Git Commit Hash: %s
UTC Build Time: %s
`, gittag, githash, buildstamp)
}
