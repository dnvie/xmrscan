export interface Block {
    data?:  Data;
    status?: string;
}

export interface Data {
    block_height:   number;
    current_height: number;
    hash:           string;
    size:           number;
    timestamp:      number;
    timestamp_utc:  Date;
    relative_time:  string
    txs:            TxInfo[];
}

export interface TxInfo {
    coinbase:   boolean;
    payment_id8: string;
    tx_size:    number;
    tx_hash: string;
}