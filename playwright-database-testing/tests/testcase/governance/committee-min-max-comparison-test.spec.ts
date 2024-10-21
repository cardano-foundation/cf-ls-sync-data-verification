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

  test("Check the min and max value of new committee", async ({}) => {
    test.step("GIVEN: Retrieve committee information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstCommitteeInformation = await postgres.getCommittee();
      let lastCommitteeInformation = await postgres.getLastCommittee();

      await test.step("THEN: committee information should be different ", () => {
        Assertions.assertNotEqual(
          firstCommitteeInformation,
          lastCommitteeInformation,
          "committee information should be different."
        );
      });
    });
  });
});
