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

  test("Check the fetch and retry of off chain drep registration - 1", async ({}) => {
    test.step("GIVEN: Retrieve off chain drep registration", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let offChainCommitteeDeregistration = await retryQuery(
        () => postgres.getOffChainDrepRegistration(),
        10,
        1000,
        "getOffChainDrepRegistration"
      );

      await test.step("THEN: off chain drep registration are being fetch after retry", () => {
        Assertions.assertNotNull(
          offChainCommitteeDeregistration,
          "There are no off chain drep registration ."
        );
      });
    });
  });
});

test("Check the fetch and retry of off chain tx hash drep registration - 2", async ({}) => {
  test.step("GIVEN: Retrieve off chain tx hash drep registration ", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashDrepRegistration = await retryQuery(
      () => postgres.getOffChainTxHashDrepRegistration(),
      10,
      1000,
      "getOffChainTxHashDrepRegistration"
    );

    await test.step("THEN: off chain tx hash drep registration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashDrepRegistration,
        "There are no off chain tx hash drep registration."
      );
    });
  });
});

test("Check the fetch and retry of off chain content drep registration - 3", async ({}) => {
  test.step("GIVEN: Retrieve off chain content drep registration ", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentDrepRegistration = await retryQuery(
      () => postgres.getOffChainContentDrepRegistration(),
      10,
      1000,
      "getOffChainContentDrepRegistration"
    );

    await test.step("THEN: off chain content drep registration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentDrepRegistration,
        "There are no off chain content drep registration."
      );
    });
  });
});

test("Check the fetch and retry of off chain valid drep registration - 4", async ({}) => {
  test.step("GIVEN: Retrieve off chain valid drep registration ", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidDrepRegistration = await retryQuery(
      () => postgres.getOffChainValidDrepRegistration(),
      10,
      1000,
      "getOffChainValidDrepRegistration"
    );

    await test.step("THEN: off chain valid drep registration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidDrepRegistration,
        "There are no off chain valid drep registration."
      );
    });
  });
});

test("Check the fetch and retry of last off chain tx hash drep registration - 5", async ({}) => {
  test.step("GIVEN: Retrieve last off chain tx hash drep registration ", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashDrepRegistration = await retryQuery(
      () => postgres.getLastOffChainTxHashDrepRegistration(),
      10,
      1000,
      "getLastOffChainTxHashDrepRegistration"
    );

    await test.step("THEN: last off chain tx hash drep registration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashDrepRegistration,
        "There are no off chain tx hash drep registration."
      );
    });
  });
});

test("Check the fetch and retry of last off chain content drep registration - 6", async ({}) => {
  test.step("GIVEN: Retrieve last off chain content drep registration ", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentDrepRegistration = await retryQuery(
      () => postgres.getLastOffChainContentDrepRegistration(),
      10,
      1000,
      "getLastOffChainContentDrepRegistration"
    );

    await test.step("THEN: last off chain content drep registration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentDrepRegistration,
        "There are no off chain content drep registration."
      );
    });
  });
});

test("Check the fetch and retry of last off chain valid drep registration - 7", async ({}) => {
  test.step("GIVEN: Retrieve last off chain valid drep registration ", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidDrepRegistration = await retryQuery(
      () => postgres.getLastOffChainValidDrepRegistration(),
      10,
      1000,
      "getLastOffChainValidDrepRegistration"
    );

    await test.step("THEN:last off chain valid drep registration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidDrepRegistration,
        "There are no off chain valid drep registration."
      );
    });
  });
});
