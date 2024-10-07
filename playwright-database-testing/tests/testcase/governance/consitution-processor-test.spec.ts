import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { PostgreSQL } from "@helpers/database/database.helper";
import { TimeOut } from "@common/constants/project.constants";

test.describe("@regression @governance", () => {
  test("Check the logic of process a new consitution", async ({}) => {
    test.step("GIVEN: Retrieve consitution information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let consitutionInformation = await postgres.getDelegationVote();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve consitution information after wait", async () => {
        let consitutionInformationAfterWait = await postgres.getDelegationVote();

        await test.step("THEN: consitution information should be different after wait ", () => {
          Assertions.assertNotEqual(
            consitutionInformation,
            consitutionInformationAfterWait,
            "consitution information should be different."
          );
        });
      });
    });
  });
});
