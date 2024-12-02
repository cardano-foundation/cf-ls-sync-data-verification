import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Verify committee member field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync committee member", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let committeeMemberInformation = await postgres.getCommitteeMember();

      test.step("THEN: committee member field should not be null", () => {
        Assertions.assertNotNull(committeeMemberInformation, "committee member should not be null.");
      });
    });
  });
});
