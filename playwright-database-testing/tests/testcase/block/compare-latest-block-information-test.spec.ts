import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @smoke @block", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the latest block in Koios and Ledger Sync", async ({}) => {
    test.step("GIVEN: Retrieve block list", async () => {
      let blockListKoios = await (await koiosService()).getBlockList();
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let blockListLS = await postgres.findBlockLatestList();

      await test.step("THEN: Compare block list information", () => {
        Assertions.assertEqual(blockListKoios, blockListLS, "Block information should be equal.");
      });
    });
  });
});
