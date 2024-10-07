import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { PostgreSQL } from "@helpers/database/database.helper";
import { TimeOut } from "@common/constants/project.constants";

test.describe("@regression @smoke @governance", () => {
  test("Check the logic of process a new delegation vote", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let delegationVote = await postgres.getDelegationVote();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve delegation vote after wait", async () => {
        let delegationVoteAfterWait = await postgres.getDelegationVote();

        await test.step("THEN: delegation vote should be different after wait ", () => {
          Assertions.assertNotEqual(delegationVote, delegationVoteAfterWait, "Delegation vote should be different.");
        });
      });
    });
  });
});
