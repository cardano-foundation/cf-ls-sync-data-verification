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

  test("Verify governance committee registration field", async ({}) => {
    test.step("GIVEN: Retrieve governance committee registration", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let governanceCommitteeRegistration = await postgres.getCommitteeRegistration();

      test.step("THEN: governance committee registration field should not be null", () => {
        Assertions.assertNotNull(
          governanceCommitteeRegistration,
          "governance committee registration should not be null."
        );
      });
    });
  });
});
