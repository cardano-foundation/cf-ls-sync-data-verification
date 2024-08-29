import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { PostgreSQL } from "@helpers/database/database.helper";
import { TimeOut } from "@common/constants/project.constants";

test.describe("@governance", () => {
  test("Check the logic of process a governance action proposal", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let governanceActionProposals = await postgres.getGovernanceActionProposal();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve governance action proposal after wait", async () => {
        let governanceActionProposalsAfterWait = await postgres.getGovernanceActionProposal();

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