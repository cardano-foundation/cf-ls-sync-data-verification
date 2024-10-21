import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @address", () => {
  test("Compare the max and min of address", async ({}) => {
    test.step("GIVEN: Retrieve min and max value of Ledger Sync address", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstAddress = await postgres.getAddressBalance();
      let lastAddress = await postgres.getLastAddressBalance();

      test.step("THEN: adrress should be different from both query  ", () => {
        Assertions.assertNotEqual(firstAddress, lastAddress, "adrress should be different from both query.");
      });
    });
  });
});
