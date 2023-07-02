export interface BlockSearch {
    data?: {
        block_height: number;
        hash: string;
    }
}

export interface TxSearch {
    data?: {
        tx_hash: string;
    }
}

export interface Search {
    Type: number
    Block?: BlockSearch;
    Tx?: TxSearch
}