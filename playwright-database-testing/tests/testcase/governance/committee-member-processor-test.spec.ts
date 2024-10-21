import DatabaseConstants from "@common/constants/database.constants";
import { TimeOut } from "@common/constants/project.constants";
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

  test("Check the logic of process a new committee member information", async ({}) => {
    test.step("GIVEN: Retrieve commitee member information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let committeeMemberInformation = await postgres.getCommitteeMember();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: committee member information after wait", async () => {
        let committeeMemberInformationAfterWait = await postgres.getCommitteeMember();

        await test.step("THEN: committee member information should be different after wait ", () => {
          Assertions.assertNotEqual(
            committeeMemberInformation,
            committeeMemberInformationAfterWait,
            "committee member information should be different."
          );
        });
      });
    });
  });
});
