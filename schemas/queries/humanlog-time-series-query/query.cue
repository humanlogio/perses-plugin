package model

import (
	"strings"
)

kind: "HumanlogTimeSeriesQuery"
spec: close({
	datasource?: {
		kind: "HumanlogDatasource"
	}
	query:             strings.MinRunes(1)
})
