import { Client, QueryResult } from "pg";
import DatabaseConstants from "@common/constants/database.constants";
import { delay } from "@common/helpers/common/common.helper";
import Logger from "@common/helpers/logger/logger.helper";
import { Env } from "playwright-database-testing/env/env";

export class PostgreSQL {
  private client!: Client;

  private databaseName: string;

  private tableName: string;

  constructor(databaseName: string) {
    Logger.info("Creating PostgreSQL client");
    this.databaseName = databaseName;
  }

  private async init() {
    const POSTGRES_URL = Env.DB_CONN_STRING || "";
    this.client = new Client({
      connectionString: POSTGRES_URL,
      connectionTimeoutMillis: DatabaseConstants.CONNECT_TIMEOUT_MS,
    });

    Logger.info("Connecting PostgreSQL client");
    await this.client.connect();
    Logger.info("Connected to PostgreSQL");

    try {
      await this.client.query(`CREATE DATABASE IF NOT EXISTS ${this.databaseName}`);
      await this.client.query(`USE ${this.databaseName}`);
      Logger.info(`Successfully connected to database: ${this.databaseName}`);
    } catch (error) {
      await this.teardown();
      throw error;
    }
  }

  async find(query: string, limit: number = 10): Promise<QueryResult<any>> {
    try {
      await this.init();
      const result: QueryResult<any> = await this.client.query(
        `SELECT * FROM ${this.tableName} WHERE ${query} LIMIT ${limit}`
      );
      return result;
    } finally {
      await this.teardown();
    }
  }

  async findWithRetries(query: string, limit: number = 10, retries: number = 3): Promise<any> {
    try {
      return await this.find(query, limit);
    } catch (error: any) {
      if (error.code === "TooManyRequests" && retries > 0) {
        retries--;
        Logger.info("Retrying find");
        await delay(DatabaseConstants.WAIT_TIME_RETRY);
        return await this.findWithRetries(query, limit);
      }
      throw error;
    }
  }

  private async teardown(): Promise<void> {
    Logger.info("Closing PostgreSQL client");
    await this.client.end();
    Logger.info("Closed PostgreSQL client");
  }

  async findAnnouncementWithSortDescendingByAnnouncedAt(limit: number): Promise<QueryResult<any>> {
    try {
      await this.init();
      const result: QueryResult<any> = await this.client.query(
        `SELECT * FROM ${this.tableName} ORDER BY announcedAt DESC LIMIT ${limit}`
      );
      return result;
    } finally {
      await this.teardown();
    }
  }

  async executeQuery(query: string): Promise<any> {
    try {
      await this.init();
      const result: QueryResult<any> = await this.client.query(query);
      return result.rows[0].max;
    } finally {
      await this.teardown();
    }
  }

  async findBlockHeight(): Promise<number | null> {
    const query = "SELECT MAX(block.blockNo) FROM Block block";
    return this.executeQuery(query);
  }

  async getMapAddressBalanceFromAddress(addresses: string[]): Promise<any[]> {
    try {
      await this.init();
      const inSql = addresses.map(() => "?").join(",");
      const query = `SELECT ab.address, ab.unit, ab.quantity FROM address_balance ab WHERE ab.unit = 'lovelace' AND ab.address IN (${inSql})`;
      const result: QueryResult<any> = await this.client.query(query, addresses);
      const addressBalancePojoLSList: any[] = result.rows.map((rs: any) => {
        const address = rs.getString("address");
        const unit = rs.getString("unit");
        const balance = BigInt(rs.getString("quantity"));

        return {
          getAddress: () => address,
          getUnit: () => unit,
          getBalance: () => balance,
        };
      });

      return addressBalancePojoLSList;
    } finally {
      await this.teardown();
    }
  }

  async findLastEpochParam(): Promise<number | null> {
    const query = "SELECT ep from EpochParam ep WHERE ep.epochNo = (SELECT MAX(e.epochNo) FROM EpochParam e)";
    return this.executeQuery(query);
  }

  async findEpochParamByEpochNo(epochNo: number): Promise<number | null> {
    const query = `SELECT ep from EpochParam ep WHERE ep.${epochNo} = (SELECT MAX(e.${epochNo}) FROM EpochParam e)`;
    return this.executeQuery(query);
  }

  async findAssetNameFromAddressBalance(): Promise<string | null> {
    const query = "SELECT asset_name FROM address_balance";
    return this.executeQuery(query);
  }

  async findQuantityFromAddressBalance(): Promise<number | null> {
    const query = "SELECT quantity FROM address_balance";
    return this.executeQuery(query);
  }

  async findBlockTimeFromAddressBalance(): Promise<number | null> {
    const query = "SELECT block_time FROM address_balance";
    return this.executeQuery(query);
  }

  async findBlockLatestList(): Promise<string | null> {
    const query = "SELECT MAX(*) FROM Block block";
    return this.executeQuery(query);
  }

  async findScriptHashInRedeemer(): Promise<string | null> {
    const query = "SELECT script_hash FROM redeemer";
    return this.executeQuery(query);
  }

  async getDelegationVote(): Promise<object | null> {
    const query = "SELECT * FROM delegation_vote";
    return this.executeQuery(query);
  }

  async getDrepRegistraion(): Promise<string | null> {
    const query = "SELECT * FROM drep_registration";
    return this.executeQuery(query);
  }

  async getGovernanceActionProposal(): Promise<object | null> {
    const query = "SELECT * FROM gov_action_proposal";
    return this.executeQuery(query);
  }

  async getCommitteeRegistration(): Promise<object | null> {
    const query = "SELECT * FROM committee_registration";
    return this.executeQuery(query);
  }

  async getVotingProcedure(): Promise<object | null> {
    const query = "SELECT * FROM voting_procedure";
    return this.executeQuery(query);
  }

  async getCommitteeMember(): Promise<object | null> {
    const query = "SELECT * FROM committee_member";
    return this.executeQuery(query);
  }

  async getConstitution(): Promise<object | null> {
    const query = "SELECT * FROM constitution";
    return this.executeQuery(query);
  }

  async getCommittee(): Promise<object | null> {
    const query = "SELECT * FROM committee";
    return this.executeQuery(query);
  }
}
