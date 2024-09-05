import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { PostgreSQL } from "@helpers/database/database.helper";
import { TimeOut } from "@common/constants/project.constants";

test.describe("@regression @governance", () => {
  test("Check the logic of process a new committee member information", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let committeeMemberInformation = await postgres.getCommitteeMember();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: committee member information after wait", async () => {
        let committeeMemberInformationAfterWait = await postgres.getCommitteeMember();

        await test.step("THEN: committee member information should be different after wait ", () => {
          Assertions.assertNotEqual(
            committeeMemberInformation,
            committeeMemberInformationAfterWait,
            "committee member information should be different."
          );
        });
      });
    });
  });
});
