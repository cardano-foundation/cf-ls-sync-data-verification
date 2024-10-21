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

  test("Verify drep registration field", async ({}) => {
    test.step("GIVEN: Retrieve drep registration", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let drepRegistration = await postgres.getDrepRegistraion();

      test.step("THEN: drep registration field should not be null", () => {
        Assertions.assertNotNull(drepRegistration, "drep registration should not be null.");
      });
    });
  });
});
