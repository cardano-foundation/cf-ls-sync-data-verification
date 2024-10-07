import DatabaseConstants from "@common/constants/database.constants";
import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @smoke @account", () => {
  test("Compare balance of random addresses", async ({}) => {
    await test.step("GIVEN: Get random addresses", async () => {
      const addressArray: string[] = Object.values(StakeAddresses);

      await test.step("WHEN: Retrieve address", async () => {
        const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
        const addressBalanceComparisonMapLS = await postgres.getMapAddressBalanceFromAddress(addressArray);
        const addressBalanceComparisonMapKoios: string[] = await (
          await koiosService()
        ).getAccountAddresses(Object.values(StakeAddresses));

        await test.step("THEN: Compare balances", () => {
          for (const addressBalanceComparisonKey in addressBalanceComparisonMapLS) {
            const addressBalanceComparison = addressBalanceComparisonMapLS[addressBalanceComparisonKey];
            const koiosBalance = addressBalanceComparisonMapKoios[addressBalanceComparisonKey];
            const s = `comparison address=${addressBalanceComparisonKey.toString()}, ls_balance=${addressBalanceComparison}, koios_balance=${koiosBalance}`;
            console.log(s);
            test.step("THEN: Assert balance equality", () => {
              Assertions.assertEqual(koiosBalance, addressBalanceComparison, "Balance should be equal.");
            });
          }

          test.step("THEN: Assert map sizes are equal", () => {
            Assertions.assertEqual(
              Object.keys(addressBalanceComparisonMapKoios).length,
              addressArray.length,
              "Map sizes should be equal."
            );
          });
        });
      });
    });
  });
});
