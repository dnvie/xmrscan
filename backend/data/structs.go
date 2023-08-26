package data

type Block struct {
	Data struct {
		BlockHeight   int64  `json:"block_height"`
		CurrentHeight int64  `json:"current_height"`
		Hash          string `json:"hash"`
		Size          int64  `json:"size"`
		Timestamp     int64  `json:"timestamp"`
		RelativeTime  string
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
		AltBlocksCount           int    `json:"alt_blocks_count"`
		BlockSizeLimit           int    `json:"block_size_limit"`
		BlockSizeMedian          int    `json:"block_size_median"`
		CumulativeDifficulty     string `json:"cumulative_difficulty"`
		Current                  bool   `json:"current"`
		CurrentHfVersion         int    `json:"current_hf_version"`
		Difficulty               string `json:"difficulty"`
		FeePerKb                 int    `json:"fee_per_kb"`
		GreyPeerlistSize         int    `json:"grey_peerlist_size"`
		HashRate                 int64  `json:"hash_rate"`
		Height                   int    `json:"height"`
		IncomingConnectionsCount int    `json:"incoming_connections_count"`
		OutgoingConnectionsCount int    `json:"outgoing_connections_count"`
		Stagenet                 bool   `json:"stagenet"`
		StartTime                int    `json:"start_time"`
		Status                   bool   `json:"status"`
		Target                   int    `json:"target"`
		TargetHeight             int    `json:"target_height"`
		Testnet                  bool   `json:"testnet"`
		TopBlockHash             string `json:"top_block_hash"`
		TxCount                  int    `json:"tx_count"`
		TxPoolSize               int    `json:"tx_pool_size"`
		TxPoolSizeKbytes         int    `json:"tx_pool_size_kbytes"`
		WhitePeerlistSize        int    `json:"white_peerlist_size"`
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
		} `json:"inputs"`
		Outputs []struct {
			PublicKey string `json:"public_key"`
		} `json:"outputs"`
		PaymentID8 string `json:"payment_id8"`
		TxFee      int64  `json:"tx_fee"`
		TxHash     string `json:"tx_hash"`
		TxSize     int64  `json:"tx_size"`
	} `json:"data"`
	Status string `json:"status"`
}

type Price struct {
	Data []struct {
		Last    string `json:"last"`
		Open24h string `json:"open24h"`
	} `json:"data"`
}

type Blocks struct {
	Blocks []BlockInfo
}

type BlockInfo struct {
	Data struct {
		BlockHeight  int64  `json:"block_height"`
		Hash         string `json:"hash"`
		Size         int64  `json:"size"`
		Timestamp    int64  `json:"timestamp"`
		RelativeTime string
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
