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

  test("Check the max and min value of delegation vote", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstDelegationVote = await postgres.getDelegationVote();
      let lastDelegationVote = await postgres.getLastDelegationVote();

      await test.step("THEN: delegation vote should be different ", () => {
        Assertions.assertNotEqual(
          firstDelegationVote,
          lastDelegationVote,
          "Delegation vote should be different."
        );
      });
    });
  });
});
