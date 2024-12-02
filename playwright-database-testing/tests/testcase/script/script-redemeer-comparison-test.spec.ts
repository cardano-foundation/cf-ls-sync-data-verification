import DatabaseConstants from "@common/constants/database.constants";
import { ScriptHash } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @smoke @script", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the script redeemer of Koios and Ledger Sync", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information from Koios", async () => {
      let scriptRedeemerKoios = await (
        await koiosService()
      ).getScriptRedeemers(ScriptHash.SCRIPT_HASH_1);

      await test.step("WHEN: retrieve script hash information form Koios and Ledger Sync", async () => {
        let scriptHashInformationKoios = scriptRedeemerKoios.map(
          (scriptHashDto) => scriptHashDto.script_hash
        );
        let scriptHashKoios: string = scriptHashInformationKoios[0];

        const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
        let scriptHashLS = await postgres.findScriptHashInRedeemer();

        test.step("THEN: Assert map sizes are equal", () => {
          Assertions.assertJsonContain(
            scriptHashKoios,
            scriptHashLS,
            "Map sizes should be equal."
          );
        });
      });
    });
  });
});
