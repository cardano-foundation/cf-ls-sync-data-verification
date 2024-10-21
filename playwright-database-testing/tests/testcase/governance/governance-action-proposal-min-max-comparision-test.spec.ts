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

  test("Check the min and max value of governance action proposal", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstGovernanceActionProposals = await postgres.getGovernanceActionProposal();
      let lastGovernanceActionProposals = await postgres.getLastGovernanceActionProposal();

      await test.step("THEN: governance action proposal should be different ", () => {
        Assertions.assertNotEqual(
          firstGovernanceActionProposals,
          lastGovernanceActionProposals,
          "Governance action proposal should be different."
        );
      });
    });
  });
});
