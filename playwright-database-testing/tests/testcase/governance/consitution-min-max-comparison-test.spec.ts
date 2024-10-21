import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the min and max of consitution", async ({}) => {
    test.step("GIVEN: Retrieve consitution information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let firstConsitutionInformation = await postgres.getConstitution();
      let lastConsitutionInformation = await postgres.getLastConstitution();

      await test.step("THEN: consitution information should be different after wait ", () => {
        Assertions.assertNotEqual(
          firstConsitutionInformation,
          lastConsitutionInformation,
          "consitution information should be different."
        );
      });
    });
  });
});
