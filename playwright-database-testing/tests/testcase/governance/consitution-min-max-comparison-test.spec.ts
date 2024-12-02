import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

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
