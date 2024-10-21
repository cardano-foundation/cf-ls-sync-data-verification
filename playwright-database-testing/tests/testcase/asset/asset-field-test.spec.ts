import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Verify asset field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync asset", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      const asset = await postgres.findAssetNameFromAddressBalance();

      test.step("THEN: asset field should not be null", () => {
        Assertions.assertNotNull(asset, "asset should not be null.");
      });
    });
  });
});
