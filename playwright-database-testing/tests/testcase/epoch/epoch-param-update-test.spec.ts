import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios_api_service/koios.service";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import DatabaseConstants from "@common/constants/database.constants";

test.describe("@epoch", () => {
  test("Check the logic of epoch parameter", async ({}) => {
    test.step("GIVEN: Retrieve epoch parameter", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let epochParameterKoios = await (await koiosService()).getEpochParameter(randomNumber);
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let epochParameterLS = await postgres.findEpochParamByEpochNo(randomNumber);

      await test.step("THEN: Compare epoch parameter information", () => {
        Assertions.assertEqual(epochParameterKoios, epochParameterLS, "epoch information should be equal.");
      });

      await test.step("WHEN: Get latest epoch parameter", async () => {
        let latestEpochParameterLS = await postgres.findLastEpochParam();
        await test.step("THEN: epoch param should be different ", () => {
          Assertions.assertNotEqual(latestEpochParameterLS, epochParameterLS, "epoch information should be different.");
          Assertions.assertNotEqual(
            latestEpochParameterLS,
            epochParameterKoios,
            "epoch information should be different."
          );
        });
      });
    });
  });
});
