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

  test("Compare the max and min of asset", async ({}) => {
    test.step("GIVEN: Retrieve min and max value of Ledger Sync asset name from Address Balance", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstAssetName = await postgres.findAssetNameFromAddressBalance();
      let lastAssetName = await postgres.findLastAssetNameFromAddressBalance();

      test.step("THEN: asset name should be different from both query  ", () => {
        Assertions.assertNotEqual(firstAssetName, lastAssetName, "asset name should be different from both query.");
      });
    });
  });
});
