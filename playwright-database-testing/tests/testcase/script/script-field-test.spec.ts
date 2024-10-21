import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @script", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Verify script field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync script", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let scriptHashLS = await postgres.findScriptHashInRedeemer();

      test.step("THEN: script field should not be null", () => {
        Assertions.assertNotNull(scriptHashLS, "script should not be null.");
      });
    });
  });
});
