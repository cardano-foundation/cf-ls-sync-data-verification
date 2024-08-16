import { test, expect } from "@playwright/test";
import { ScriptHash } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import DatabaseConstants from "@common/constants/database.constants";
import { PostgreSQL } from "@helpers/database/database.helper";

test.describe("@script", () => {
  test("Compare the script redeemer of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information from Koios", async () => {
      let scriptRedeemerKoios = await (await koiosService()).getScriptRedeemers(ScriptHash.SCRIPT_HASH_1);

      await test.step("WHEN: retrieve script hash information form Koios and Ledger Sync", async () => {
        let scriptHashInformationKoios = scriptRedeemerKoios.map((scriptHashDto) => scriptHashDto.script_hash);
        let scriptHashKoios: string = scriptHashInformationKoios[0];

        const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
        let scriptHashLS = await postgres.findScriptHashInRedeemer();

        test.step("THEN: Assert map sizes are equal", () => {
          Assertions.assertJsonContain(scriptHashKoios, scriptHashLS, "Map sizes should be equal.");
        });
      });
    });
  });
});
