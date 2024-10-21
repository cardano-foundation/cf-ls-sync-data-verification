import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Verify governance action field", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let governanceActionProposals = await postgres.getGovernanceActionProposal();

      test.step("THEN: governance action field should not be null", () => {
        Assertions.assertNotNull(governanceActionProposals, "governance action should not be null.");
      });
    });
  });
});
