package main

import (
    "fmt"
	"os"

    "app/server"
    "app/routes"

    "github.com/infinitelyio/cli"
)

// build version
var Githash,
    Gitbranch,
    Buildstamp string

func main() {
    Run(os.Args)
}

func Run(args []string) {

    app := cli.NewApp()
	app.Name = "infinitely"
	app.Usage = "A Re-brand infinitely written in GoLang"

    app.Version = Gitbranch + "-" + Githash + " (" + Buildstamp + ")"
    app.HideVersion = true

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

	app.AttachWS()
    app.AttachRoutes(routes.HomeRoute)
    app.Run()
}

func Version(c *cli.Context) {
	fmt.Printf(`Git branch: %s
Git Commit Hash: %s
UTC Build Time: %s
`, Gitbranch, Githash, Buildstamp)
}
