import { Env } from "playwright-database-testing/env/env";

export class Koios {
  static readonly BASE_KOIOS_MAIN_NET_URL = Env.KOIOS_API_URL;

  static getTip = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/tip`;
    }
  };

  static getAccountAddresses = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/account_addresses`;
    }
  };

  static getAccountTransaction = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/account_txs`;
    }
  };

  static getBlockList = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/blocks`;
    }
  };

  static getBlockTransaction = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/block_txs`;
    }
  };

  static getTransactionInformation = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/tx_info`;
    }
  };

  static submitTransaction = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/submittx`;
    }
  };

  static getTransactionStatus = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/tx_status`;
    }
  };

  static getEpochInformation = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/epoch_info`;
    }
  };

  static getEpochProtocolParameters = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/epoch_params`;
    }
  };

  static getEpochBlockProtocols = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/epoch_block_protocols`;
    }
  };

  static getAssetUtxos = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/asset_utxos`;
    }
  };

  static getAssetHistory = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/asset_history`;
    }
  };

  static getPoolRegistration = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/pool_registrations`;
    }
  };
}
