export interface KoiosGetAddressInfoDto {
  address: string;
  balance: number;
  stake_address: string;
  script_address: boolean;
  utxo_set: [
    {
      value: number;
      tx_hash: string;
      tx_index: number;
      asset_list: [
        {
          decimals: number;
          quantity: number;
          policy_id: string;
          asset_name: string;
          fingerprint: string;
        },
      ];
      block_time: number;
      datum_hash: string;
      block_height: number;
      inline_datum: number;
      reference_script: number;
    },
  ];
}
