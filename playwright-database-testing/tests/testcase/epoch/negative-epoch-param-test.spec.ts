import DatabaseConstants from "@common/constants/database.constants";
import { Empty, Null } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @epoch", () => {
  test("Check the logic of epoch parameter under faulty data -1", async ({}) => {
    test.step("GIVEN: Retrieve epoch parameter", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let epochParameterLS = await postgres.findEpochParamByEpochNo(Empty.EMPTY);

      await test.step("THEN: Compare epoch parameter information", () => {
        Assertions.assertNull(epochParameterLS, "epoch information should be null.");
      });
    });
  });
});

test("Check the logic of epoch parameter under faulty data -2", async ({}) => {
  test.step("GIVEN: Retrieve epoch parameter", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let epochParameterLS = await postgres.findEpochParamByEpochNo(Null.NULL);

    await test.step("THEN: Compare epoch parameter information", () => {
      Assertions.assertNull(epochParameterLS, "epoch information should be null.");
    });
  });
});
