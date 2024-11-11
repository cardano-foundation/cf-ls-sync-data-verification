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

  test("Check the max and min value of voting", async ({}) => {
    test.step("GIVEN: Retrieve vote information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstVoteInformation = await postgres.getVotingProcedure();
      let lastVoteInformation = await postgres.getVotingProcedure();

      await test.step("THEN: vote informationl should be different ", () => {
        Assertions.assertNotEqual(
          firstVoteInformation,
          lastVoteInformation,
          "Vote information should be different."
        );
      });
    });
  });
});
