package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
	"github.com/metakeule/fmtdate"
)
var (
	format = flag.String("f", "YYYY-MM-DDThh:mm:ssZ", "Display date to format")
)

func main() {
	flag.Parse()

	var date string
	date = fmtdate.Format(*format, time.Now())

	if flag.NArg() > 0 {
		arg := flag.Arg(0)
		if strings.HasPrefix(arg, "@") {
			unixTime, err := strconv.ParseInt(strings.TrimLeft(arg, "@"), 10, 64)
			if err != nil {
				fmt.Fprintf(os.Stderr, "%s: invalid unix time format\n", arg)
				os.Exit(1)
			}
			date = fmtdate.Format(*format, time.Unix(unixTime, 0))
		} else {
			fmt.Fprintf(os.Stderr, "%s: invalid argument\n", arg)
			os.Exit(1)
		}
	}

	fmt.Fprintln(os.Stdout, date)
}