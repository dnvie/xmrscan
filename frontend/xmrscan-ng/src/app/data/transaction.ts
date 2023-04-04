export interface Transaction {
    data?:   Data;
    status?: string;
}

export interface Data {
    block_height:   number;
    coinbase:       boolean;
    confirmations:  number;
    current_height: number;
    inputs:         Input[];
    outputs:        Output[];
    payment_id8:    string;
    tx_fee:         number;
    tx_hash:        string;
    tx_size:        number;
}

export interface Input {
    key_image: string;
}

export interface Output {
    public_key: string;
}