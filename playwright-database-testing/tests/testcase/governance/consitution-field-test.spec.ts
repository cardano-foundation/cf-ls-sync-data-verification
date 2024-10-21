import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Verify consitution field", async ({}) => {
    test.step("GIVEN: Retrieve consitution information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let consitutionInformation = await postgres.getConstitution();

      test.step("THEN: consitution field should not be null", () => {
        Assertions.assertNotNull(consitutionInformation, "consitution should not be null.");
      });
    });
  });
});
