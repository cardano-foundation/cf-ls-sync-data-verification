import DatabaseConstants from "@common/constants/database.constants";
import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @smoke @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process a governance action proposal", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let governanceActionProposals =
        await postgres.getGovernanceActionProposal();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, TimeOut.FIVE_SECONDS)
        ); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve governance action proposal after wait", async () => {
        let governanceActionProposalsAfterWait =
          await postgres.getGovernanceActionProposal();

        await test.step("THEN: governance action proposal should be different after wait ", () => {
          Assertions.assertNotEqual(
            governanceActionProposals,
            governanceActionProposalsAfterWait,
            "Governance action proposal should be different."
          );
        });
      });
    });
  });
});
