import DatabaseConstants from "@common/constants/database.constants";
import { TimeOut } from "@common/constants/project.constants";
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

  test("Compare the tip of Koios and Ledger Sync", async ({ request }) => {
    test.step("GIVEN: Retrieve chain tip", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let chainTipLS = await postgres.findBlockHeight();
      let chainTipKoios = await (await koiosService()).getTip();

      await test.step("THEN: Compare chain tip", () => {
        Assertions.assertEqual(
          chainTipLS,
          chainTipKoios,
          "Chain tips should be equal."
        );
      });

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, TimeOut.FIVE_SECONDS)
        ); // Wait for 5 seconds
      });

      await test.step("WHEN: Retrieve chain tip again", async () => {
        let chainTipLSAfterWait = await postgres.findBlockHeight();
        let chainTipKoiosAfterWait = await (await koiosService()).getTip();

        await test.step("THEN: Compare chain tip again", () => {
          Assertions.assertEqual(
            chainTipLSAfterWait,
            chainTipKoiosAfterWait,
            "Chain tips should be equal after waiting."
          );
        });

        await test.step("THEN: Assert the chain tip sync after a period of time", () => {
          Assertions.assertNotEqual(
            String(chainTipLS),
            String(chainTipKoiosAfterWait),
            "Chain tips should not be equal after waiting."
          );
          Assertions.assertNotEqual(
            String(chainTipKoios),
            String(chainTipLSAfterWait),
            "Chain tips should not be equal after waiting."
          );
        });
      });
    });
  });
});
