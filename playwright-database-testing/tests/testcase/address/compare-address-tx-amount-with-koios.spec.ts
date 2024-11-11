import DatabaseConstants from "@common/constants/database.constants";
import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @address", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the Address_Tx_Amount table in LS with Koios", async ({}) => {
    test.step("GIVEN: Retrieve Address_Tx_Amount table info to compare with Koios", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let address = String(await postgres.getAddressFromAddressTxAmount());

      test.step("WHEN: retrieve data from Koios", async () => {
        let addressKoios = await (
          await koiosService()
        ).getAddressInformation(address);

        test.step("THEN: Compare both value", async () => {
          Assertions.assertEqual(
            address,
            addressKoios,
            "the address are different between Address_Tx_amount and Koios"
          );

          test.step("WHEN: wait for 5 second to retrieve new TX ", async () => {
            await new Promise((resolve) =>
              setTimeout(resolve, TimeOut.FIVE_SECONDS)
            ); // Wait for 5 seconds
          });

          await test.step("WHEN: Retrieve data again", async () => {
            let addressAfter = String(
              await postgres.getAddressFromAddressTxAmount()
            );
            let addressKoiosAfter = await (
              await koiosService()
            ).getAddressInformation(addressAfter);

            await test.step("THEN: Compare both value again", () => {
              Assertions.assertEqual(
                addressAfter,
                addressKoiosAfter,
                "the address are different between Address_Tx_amount and Koio."
              );
            });

            await test.step("THEN: the information of Koios and LS should not be the same after wait", () => {
              Assertions.assertNotEqual(
                address,
                addressAfter,
                "information should not be equals after wait."
              );
              Assertions.assertNotEqual(
                addressKoios,
                addressKoiosAfter,
                "information should not be equals after wait."
              );
              Assertions.assertNotEqual(
                address,
                addressKoiosAfter,
                "information should not be equals after wait."
              );
              Assertions.assertNotEqual(
                addressAfter,
                addressKoios,
                "information should not be equals after wait."
              );
            });
          });
        });
      });
    });
  });
});
