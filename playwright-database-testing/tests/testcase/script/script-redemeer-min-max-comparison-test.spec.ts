import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression  @script", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the min and max value of script redeemer", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information from Ledger Sync", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstScriptHash = await postgres.findScriptHashInRedeemer();
      let lastScriptHash = await postgres.findLastScriptHashInRedeemer();

      test.step("THEN: Assert map sizes are equal", () => {
        Assertions.assertNotEqual(
          firstScriptHash,
          lastScriptHash,
          "Map sizes should be equal."
        );
      });
    });
  });
});
