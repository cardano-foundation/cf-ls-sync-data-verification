import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import DatabaseConstants from "@common/constants/database.constants";

test.describe("@regression @smoke @block", () => {
  test("Compare the latest block in Koios and Ledger Sync", async ({}) => {
    test.step("GIVEN: Retrieve block list", async () => {
      let blockListKoios = await (await koiosService()).getBlockList();
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let blockListLS = await postgres.findBlockLatestList();

      await test.step("THEN: Compare block list information", () => {
        Assertions.assertEqual(blockListKoios, blockListLS, "Block information should be equal.");
      });
    });
  });
});
