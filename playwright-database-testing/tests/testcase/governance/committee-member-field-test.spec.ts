import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Verify committee member field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync committee member", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let committeeMemberInformation = await postgres.getCommitteeMember();

      test.step("THEN: committee member field should not be null", () => {
        Assertions.assertNotNull(
          committeeMemberInformation,
          "committee member should not be null."
        );
      });
    });
  });
});
