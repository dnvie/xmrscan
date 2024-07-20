export interface BlockInfo {
    data?: {
        block_height: number;
        hash: string;
        size: number;
        timestamp: number;
        relative_time: string;
        txs: {
        }[];
    };
    status?: string;
}

export interface Blocks {
    blocks?: BlockInfo[]
    current_height?: number;
    limit?: number;
    page?: number;
    total_page_no?: number;
}