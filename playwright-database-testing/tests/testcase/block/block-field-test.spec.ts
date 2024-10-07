import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @block", () => {
  test("Verify block field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync block", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      const block = await postgres.findBlockList();

      test.step("THEN: block field should not be null", () => {
        Assertions.assertNotNull(block, "block should not be null.");
      });
    });
  });
});
