import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @epoch", () => {
  test("Verify epoch field", async ({}) => {
    test.step("GIVEN: Retrieve Ledger Sync epoch", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let epochParameterLS = await postgres.findEpochParamByEpochNo(randomNumber);

      test.step("THEN: epoch field should not be null", () => {
        Assertions.assertNotNull(epochParameterLS, "epoch should not be null.");
      });
    });
  });
});
