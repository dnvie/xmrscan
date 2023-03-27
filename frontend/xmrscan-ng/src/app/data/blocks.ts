export interface BlockInfo {
    data?: {
        block_height: number;
        hash: string;
        size: number;
        timestamp_utc: string;
        txs: {
        }[];
    };
    status?: string;
}

export interface Blocks {
    Blocks?: BlockInfo[]
}