package data

type Block struct {
	Data struct {
		BlockHeight   int64  `json:"block_height"`
		CurrentHeight int64  `json:"current_height"`
		Hash          string `json:"hash"`
		Size          int64  `json:"size"`
		Timestamp     int64  `json:"timestamp"`
		TimestampUtc  string `json:"timestamp_utc"`
		Txs           []struct {
			Coinbase   bool   `json:"coinbase"`
			Extra      string `json:"extra"`
			Mixin      int64  `json:"mixin"`
			PaymentID  string `json:"payment_id"`
			PaymentID8 string `json:"payment_id8"`
			RctType    int64  `json:"rct_type"`
			TxFee      int64  `json:"tx_fee"`
			TxHash     string `json:"tx_hash"`
			TxSize     int64  `json:"tx_size"`
			TxVersion  int64  `json:"tx_version"`
			XmrInputs  int64  `json:"xmr_inputs"`
			XmrOutputs int64  `json:"xmr_outputs"`
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
		BlockHeight   int64  `json:"block_height"`
		Coinbase      bool   `json:"coinbase"`
		Confirmations int64  `json:"confirmations"`
		CurrentHeight int64  `json:"current_height"`
		Extra         string `json:"extra"`
		Inputs        []struct {
			Amount   int64  `json:"amount"`
			KeyImage string `json:"key_image"`
			Mixins   []struct {
				BlockNo   int64  `json:"block_no"`
				PublicKey string `json:"public_key"`
				TxHash    string `json:"tx_hash"`
			} `json:"mixins"`
		} `json:"inputs"`
		Mixin   int64 `json:"mixin"`
		Outputs []struct {
			Amount    int64  `json:"amount"`
			PublicKey string `json:"public_key"`
		} `json:"outputs"`
		PaymentID    string `json:"payment_id"`
		PaymentID8   string `json:"payment_id8"`
		RctType      int64  `json:"rct_type"`
		Timestamp    int64  `json:"timestamp"`
		TimestampUtc string `json:"timestamp_utc"`
		TxFee        int64  `json:"tx_fee"`
		TxHash       string `json:"tx_hash"`
		TxSize       int64  `json:"tx_size"`
		TxVersion    int64  `json:"tx_version"`
		XmrInputs    int64  `json:"xmr_inputs"`
		XmrOutputs   int64  `json:"xmr_outputs"`
	} `json:"data"`
	Status string `json:"status"`
}

type Price []struct {
	CurrentPrice             float64 `json:"current_price"`
	PriceChangePercentage24H float64 `json:"price_change_percentage_24h"`
}

type Blocks struct {
	Blocks []BlockInfo
}

type BlockInfo struct {
	Data struct {
		BlockHeight  int64  `json:"block_height"`
		Hash         string `json:"hash"`
		Size         int64  `json:"size"`
		TimestampUtc string `json:"timestamp_utc"`
		Txs          []struct {
		} `json:"txs"`
	} `json:"data"`
	Status string `json:"status"`
}
