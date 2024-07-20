package data

type Home struct {
	Blocks []BlockInfo `json:"blocks"`
	Txs    []struct {
		Coinbase   bool   `json:"coinbase"`
		PaymentID8 string `json:"payment_id8"`
		TxHash     string `json:"tx_hash"`
		TxSize     int64  `json:"tx_size"`
	} `json:"txs"`
	Status string `json:"status"`
}

type Block struct {
	Data struct {
		BlockHeight   int64  `json:"block_height"`
		CurrentHeight int64  `json:"current_height"`
		Hash          string `json:"hash"`
		Size          int64  `json:"size"`
		Timestamp     int64  `json:"timestamp"`
		RelativeTime  string `json:"relative_time"`
		Txs           []struct {
			Coinbase   bool   `json:"coinbase"`
			PaymentID8 string `json:"payment_id8"`
			TxHash     string `json:"tx_hash"`
			TxSize     int64  `json:"tx_size"`
		} `json:"txs"`
	} `json:"data"`
	Status string `json:"status"`
}

type NetworkInfo struct {
	Data struct {
		Height int `json:"height"`
	} `json:"data"`
	Status string `json:"status"`
}

type Tx struct {
	Data struct {
		BlockHeight   int64 `json:"block_height"`
		Coinbase      bool  `json:"coinbase"`
		Confirmations int64 `json:"confirmations"`
		CurrentHeight int64 `json:"current_height"`
		Inputs        []struct {
			KeyImage string `json:"key_image"`
			Amount   int64  `json:"amount"`
		} `json:"inputs"`
		Outputs []struct {
			PublicKey string `json:"public_key"`
			Amount    int64  `json:"amount"`
		} `json:"outputs"`
		PaymentID8 string `json:"payment_id8"`
		TxFee      int64  `json:"tx_fee"`
		TxHash     string `json:"tx_hash"`
		TxSize     int64  `json:"tx_size"`
	} `json:"data"`
	Status string `json:"status"`
}

type TransactionsBlocks struct {
	Data struct {
		Blocks []struct {
			Age          string  `json:"age"`
			Hash         string  `json:"hash"`
			Height       int64   `json:"height"`
			Size         float64 `json:"size"`
			Timestamp    int64   `json:"timestamp"`
			TimestampUtc string  `json:"timestamp_utc"`
			Txs          []struct {
			} `json:"txs"`
		} `json:"blocks"`
		CurrentHeight int `json:"current_height"`
		Limit         int `json:"limit"`
		Page          int `json:"page"`
		TotalPageNo   int `json:"total_page_no"`
	} `json:"data"`
	Status string `json:"status"`
}

type Blocks struct {
	Blocks        []BlockInfo `json:"blocks"`
	CurrentHeight int         `json:"current_height"`
	Limit         int         `json:"limit"`
	Page          int         `json:"page"`
	TotalPageNo   int         `json:"total_page_no"`
}

type BlockInfo struct {
	Data struct {
		BlockHeight  int64  `json:"block_height"`
		Hash         string `json:"hash"`
		Size         int64  `json:"size"`
		Timestamp    int64  `json:"timestamp"`
		RelativeTime string `json:"relative_time"`
		Txs          []struct {
		} `json:"txs"`
	} `json:"data"`
	Status string `json:"status"`
}

type Mempool struct {
	Data struct {
		Txs []struct {
			Coinbase   bool   `json:"coinbase"`
			PaymentID8 string `json:"payment_id8"`
			TxHash     string `json:"tx_hash"`
			TxSize     int64  `json:"tx_size"`
		} `json:"txs"`
		TxsNo int `json:"txs_no"`
	} `json:"data"`
	Status string `json:"status"`
}

type TxSearch struct {
	Data struct {
		TxHash string `json:"tx_hash"`
	} `json:"data"`
}

type BlockSearch struct {
	Data struct {
		BlockHeight int64  `json:"block_height"`
		Hash        string `json:"hash"`
	} `json:"data"`
}

type SearchResult struct {
	Type  int64
	Block BlockSearch
	Tx    TxSearch
}

type Prove struct {
	Data struct {
		Address string `json:"address"`
		Outputs []struct {
			Amount       int64  `json:"amount"`
			Match        bool   `json:"match"`
			OutputIdx    int    `json:"output_idx"`
			OutputPubkey string `json:"output_pubkey"`
		} `json:"outputs"`
		TxConfirmations int    `json:"tx_confirmations"`
		TxHash          string `json:"tx_hash"`
		TxProve         bool   `json:"tx_prove"`
		TxTimestamp     int    `json:"tx_timestamp"`
		Viewkey         string `json:"viewkey"`
	} `json:"data"`
	Status string `json:"status"`
}

type ProveResult struct {
	Amount  int      `json:"amount"`
	Matches []string `json:"matches"`
}
