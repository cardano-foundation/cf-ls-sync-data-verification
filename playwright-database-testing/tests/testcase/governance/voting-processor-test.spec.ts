import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { PostgreSQL } from "@helpers/database/database.helper";
import { TimeOut } from "@common/constants/project.constants";

test.describe("@governance", () => {
  test("Check the logic of process of voting", async ({}) => {
    test.step("GIVEN: Retrieve vote information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let votesInformation = await postgres.getVottingProcedure();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve vote information after wait", async () => {
        let votesInformationAfterWait = await postgres.getVottingProcedure();

        await test.step("THEN: vote informationl should be different after wait ", () => {
          Assertions.assertNotEqual(
            votesInformation,
            votesInformationAfterWait,
            "Vote information should be different."
          );
        });
      });
    });
  });
});