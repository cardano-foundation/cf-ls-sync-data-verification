import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @address", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Verify address field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync address", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      const address = await postgres.getAddressBalance();

      test.step("THEN: address field should not be null", () => {
        Assertions.assertNotNull(address, "Address should not be null.");
      });
    });
  });
});
