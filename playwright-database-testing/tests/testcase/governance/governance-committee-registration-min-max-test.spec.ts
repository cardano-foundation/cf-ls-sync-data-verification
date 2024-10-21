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

  test("Check the min and max of governance committee registration", async ({}) => {
    test.step("GIVEN: Retrieve governance committee registration", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstGovernanceCommitteeRegistration = await postgres.getCommitteeRegistration();
      let lastGovernanceCommitteeRegistration = await postgres.getLastCommitteeRegistration();

      await test.step("THEN: governance committee registration should be different ", () => {
        Assertions.assertNotEqual(
          firstGovernanceCommitteeRegistration,
          lastGovernanceCommitteeRegistration,
          "Governance committee registration should be different."
        );
      });
    });
  });
});
