export interface KoiosGetAddressUtxoDto {
  tx_hash: string;
  tx_index: number;
  address: string;
  value: number;
  stake_address: string;
  payment_cred: string;
  epoch_no: number;
  block_height: number;
  block_time: number;
  datum_hash: string;
  inline_datum: number;
  reference_script: number;
  asset_list: [
    {
      decimals: number;
      quantity: number;
      tx_index: number;
      policy_id: string;
      asset_name: string;
      fingerprint: string;
    },
  ];
  is_spent: boolean;
}
