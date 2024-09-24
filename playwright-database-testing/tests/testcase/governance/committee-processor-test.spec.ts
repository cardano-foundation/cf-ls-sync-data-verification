import DatabaseConstants from "@common/constants/database.constants";
import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process a new committee", async ({}) => {
    test.step("GIVEN: Retrieve committee information", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let committeeInformation = await postgres.getCommittee();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve committee information after wait", async () => {
        let committeeInformationAfterWait = await postgres.getCommittee();

        await test.step("THEN: committee information should be different after wait ", () => {
          Assertions.assertNotEqual(
            committeeInformation,
            committeeInformationAfterWait,
            "committee information should be different."
          );
        });
      });
    });
  });
});
