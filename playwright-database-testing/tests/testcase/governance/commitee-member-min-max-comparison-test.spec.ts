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

  test("Check the min and max of new committee member information", async ({}) => {
    test.step("GIVEN: Retrieve min and max commitee member information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstCommitteeMemberInformation = await postgres.getCommitteeMember();
      let lastCommitteeMemberInformation =
        await postgres.getLastCommitteeMember();

      await test.step("THEN: committee member information should be different ", () => {
        Assertions.assertNotEqual(
          firstCommitteeMemberInformation,
          lastCommitteeMemberInformation,
          "committee member information should be different."
        );
      });
    });
  });
});
