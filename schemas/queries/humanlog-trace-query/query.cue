package model

import (
	"strings"
)

kind: "HumanlogTraceQuery"
spec: close({
	datasource?: {
		kind: "HumanlogDatasource"
	}
	query: strings.MinRunes(1)
})
