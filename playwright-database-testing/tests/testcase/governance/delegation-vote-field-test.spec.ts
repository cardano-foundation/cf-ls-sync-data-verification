import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Verify delegation vote field", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let delegationVote = await postgres.getDelegationVote();

      test.step("THEN: delegation vote field should not be null", () => {
        Assertions.assertNotNull(delegationVote, "delegation vote should not be null.");
      });
    });
  });
});
