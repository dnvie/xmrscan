import { BlockInfo } from "./blocks";

export interface Home {
    blocks?: BlockInfo[];
    txs: {
        coinbase: boolean;
        payment_id8: string;
        tx_hash: string;
        tx_size: number;
      }[];
}