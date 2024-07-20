export interface Mempool {
    data?: {
        txs: {
            coinbase: boolean;
            payment_id8: string;
            tx_hash: string;
            tx_size: number;
        }[];
        txs_no: number;
    };
    status?: string;
}