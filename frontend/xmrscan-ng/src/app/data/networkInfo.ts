export interface NetworkInfo {
    data?:   Data;
    status?: string;
}

export interface Data {
    alt_blocks_count:           number;
    block_size_limit:           number;
    block_size_median:          number;
    cumulative_difficulty:      string;
    current:                    boolean;
    current_hf_version:         number;
    difficulty:                 string;
    fee_per_kb:                 number;
    grey_peerlist_size:         number;
    hash_rate:                  number;
    height:                     number;
    incoming_connections_count: number;
    outgoing_connections_count: number;
    stagenet:                   boolean;
    start_time:                 number;
    status:                     boolean;
    target:                     number;
    target_height:              number;
    testnet:                    boolean;
    top_block_hash:             string;
    tx_count:                   number;
    tx_pool_size:               number;
    tx_pool_size_kbytes:        number;
    white_peerlist_size:        number;
}