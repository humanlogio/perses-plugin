package model

import (
	"github.com/perses/perses/cue/common"
)

kind: "HumanlogDatasource"
spec: {
	#directUrl
}

#directUrl: {
	directUrl: common.#url
}
