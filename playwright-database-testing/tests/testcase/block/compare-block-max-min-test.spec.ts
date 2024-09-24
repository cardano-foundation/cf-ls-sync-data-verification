import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @block", () => {
  test("Compare the max and min of block", async ({}) => {
    test.step("GIVEN: Retrieve min and max value of Ledger Sync block", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstBlock = await postgres.findBlockList();
      let lastBlock = await postgres.findLastBlockList();

      test.step("THEN: block should be different from both query  ", () => {
        Assertions.assertEqual(firstBlock, lastBlock, "block should be different from both query.");
      });
    });
  });
});
