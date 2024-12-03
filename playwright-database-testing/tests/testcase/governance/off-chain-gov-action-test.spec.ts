import DatabaseConstants from "@common/constants/database.constants";
import { retryQuery } from "@common/helpers/database/retry-query.helper";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { test } from "@playwright/test";

test.describe("@regression @off-chain", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the fetch and retry of gov action off chain - 1", async ({}) => {
    test.step("GIVEN: Retrieve off chain gov action", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let offChainDataGovAction = await retryQuery(
        () => postgres.getOffChainDataGovAction(),
        10,
        1000,
        "getOffChainDataGovAction"
      );

      await test.step("THEN: off chain governance action are being fetch after retry", () => {
        Assertions.assertNotNull(
          offChainDataGovAction,
          "There are no off chain governance action."
        );
      });
    });
  });
});

test("Check the fetch and retry of gov action tx hash off chain - 2", async ({}) => {
  test.step("GIVEN: Retrieve off chain tx hash gov action", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashDataGovAction = await retryQuery(
      () => postgres.getOffChainTxHashGovAction(),
      10,
      1000,
      "getOffChainTxHashGovAction"
    );

    await test.step("THEN: off chain governance tx hash are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashDataGovAction,
        "There are no off chain tx hash governance action."
      );
    });
  });
});

test("Check the fetch and retry of content gov action off chain - 3", async ({}) => {
  test.step("GIVEN: Retrieve content gov action off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentGovAction = await retryQuery(
      () => postgres.getOffChainContentGovAction(),
      10,
      1000,
      "getOffChainContentGovAction"
    );

    await test.step("THEN: off chain governance content are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentGovAction,
        "There are no off chain content governance action."
      );
    });
  });
});

test("Check the fetch and retry of valid gov action off chain - 4", async ({}) => {
  test.step("GIVEN: Retrieve valid gov action off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainCheckValidGovAction = await retryQuery(
      () => postgres.getOffChainCheckValidGovAction(),
      10,
      1000,
      "getOffChainCheckValidGovAction"
    );

    await test.step("THEN: off chain governance valid are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainCheckValidGovAction,
        "There are no off chain valid governance action."
      );
    });
  });
});

test("Check the fetch and retry of last gov action tx hash off chain - 5", async ({}) => {
  test.step("GIVEN: Retrieve last off chain tx hash gov action", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashDataGovAction = await retryQuery(
      () => postgres.getLastOffChainTxHashGovAction(),
      10,
      1000,
      "getLastOffChainTxHashGovAction"
    );

    await test.step("THEN: off chain governance tx hash are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashDataGovAction,
        "There are no off chain tx hash governance action."
      );
    });
  });
});

test("Check the fetch and retry of last content gov action off chain - 6", async ({}) => {
  test.step("GIVEN: Retrieve last content gov action off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentGovAction = await retryQuery(
      () => postgres.getLastOffChainContentGovAction(),
      10,
      1000,
      "getLastOffChainContentGovAction"
    );

    await test.step("THEN: off chain governance content are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentGovAction,
        "There are no off chain content governance action."
      );
    });
  });
});

test("Check the fetch and retry of last valid gov action off chain - 7", async ({}) => {
  test.step("GIVEN: Retrieve last valid gov action off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainCheckValidGovAction = await retryQuery(
      () => postgres.getLastOffChainCheckValidGovAction(),
      10,
      1000,
      "getLastOffChainCheckValidGovAction"
    );

    await test.step("THEN: off chain governance valid are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainCheckValidGovAction,
        "There are no off chain valid governance action."
      );
    });
  });
});
