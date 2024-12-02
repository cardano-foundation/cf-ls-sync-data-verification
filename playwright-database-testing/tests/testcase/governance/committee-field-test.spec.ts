import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Verify committee field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync committee", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let committeeInformation = await postgres.getCommittee();

      test.step("THEN: committee field should not be null", () => {
        Assertions.assertNotNull(committeeInformation, "committee should not be null.");
      });
    });
  });
});
