import DatabaseConstants from "@common/constants/database.constants";
import { AssetName, AssetPolicy } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @smoke @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the asset history of Koios and Ledger Sync", async ({}) => {
    test.step("GIVEN: Retrieve Koios asset history information", async () => {
      let assetHistoryKoios = await (
        await koiosService()
      ).getAssetHistory(AssetPolicy.ASSET_POLICY_1, AssetName.ASSET_NAME_1);

      await test.step("WHEN: Retrieve asset_name from Koios and Ledger Sync", async () => {
        let assetNameKoiosInformation = assetHistoryKoios.map(
          (assetDto) => assetDto.asset_name
        );
        let assetNameKoios: string = assetNameKoiosInformation[0];

        const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
        let assetNameLS = await postgres.findAssetNameFromAddressBalance();

        await test.step("AND: Retrieve quantity from Koios and Ledger Sync", async () => {
          let assetQuantityKoiosInformation = assetHistoryKoios.map(
            (assetDto) => assetDto.minting_txs[0].quantity
          );
          let assetQuantityKoios: string = assetQuantityKoiosInformation[0];

          let assetQuantityLS = await postgres.findQuantityFromAddressBalance();

          await test.step("AND: Retrieve block_time from Koios and Ledger Sync ", () => {
            let assetBlockTimeKoiosInformation = assetHistoryKoios.map(
              (assetDto) => assetDto.minting_txs[0].block_time
            );
            let assetBlockTimeKoios: string = assetBlockTimeKoiosInformation[0];

            let assetBlockTimeLS = postgres.findBlockTimeFromAddressBalance();

            test.step("THEN: asset_name , quantity, block_time from Koios and Ledger Sync should be similar  ", () => {
              Assertions.assertEqual(
                assetNameKoios,
                assetNameLS,
                "asset_name should be the same."
              );
              Assertions.assertEqual(
                assetQuantityKoios,
                assetQuantityLS,
                "quantity should be the same."
              );
              Assertions.assertEqual(
                assetBlockTimeKoios,
                assetBlockTimeLS,
                " block_time should be the same."
              );
            });
          });
        });
      });
    });
  });
});
