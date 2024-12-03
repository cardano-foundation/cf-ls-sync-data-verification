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

  test("Check the fetch and retry of off chain committee deregistration", async ({}) => {
    test.step("GIVEN: Retrieve off chain committee deregistration", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let offChainCommitteeDeregistration = await retryQuery(
        () => postgres.getOffChainCommitteeDeregistration(),
        10,
        1000,
        "getOffChainCommitteeDeregistration"
      );

      await test.step("THEN: off chain committee deregistration are being fetch after retry", () => {
        Assertions.assertNotNull(
          offChainCommitteeDeregistration,
          "There are no off chain committee deregistration ."
        );
      });
    });
  });
});

test("Check the fetch and retry of off chain tx hash committee deregistration - 1", async ({}) => {
  test.step("GIVEN: Retrieve off chain tx hash committee deregistration", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashCommitteeDeregistration = await retryQuery(
      () => postgres.getOffChainTxHashCommitteeDeregistration(),
      10,
      1000,
      "getOffChainTxHashCommitteeDeregistration"
    );

    await test.step("THEN: off chain tx hash committee deregistration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashCommitteeDeregistration,
        "There are no off chain tx hash committee deregistration."
      );
    });
  });
});

test("Check the fetch and retry of off chain content committee deregistration - 2", async ({}) => {
  test.step("GIVEN: Retrieve off chain content committee deregistration", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentCommitteeDeregistration = await retryQuery(
      () => postgres.getOffChainContentCommitteeDeregistration(),
      10,
      1000,
      "getOffChainContentCommitteeDeregistration"
    );

    await test.step("THEN: off chain content committee deregistration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentCommitteeDeregistration,
        "There are no off chain content committee deregistration."
      );
    });
  });
});

test("Check the fetch and retry of valid committee deregistration off chain - 3", async ({}) => {
  test.step("GIVEN: Retrieve valid committee deregistration off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidConstitution = await retryQuery(
      () => postgres.getOffChainValidCommitteeDeregistration(),
      10,
      1000,
      "getOffChainValidConstitution"
    );

    await test.step("THEN: valid committee deregistration off chain are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidConstitution,
        "There are no valid committee deregistration off chain."
      );
    });
  });
});

test("Check the fetch and retry of last off chain tx hash committee deregistration - 4", async ({}) => {
  test.step("GIVEN: Retrieve off chain tx hash committee deregistration", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashCommitteeDeregistration = await retryQuery(
      () => postgres.getLastOffChainTxHashCommitteeDeregistration(),
      10,
      1000,
      "getLastOffChainTxHashCommitteeDeregistration"
    );

    await test.step("THEN: off chain tx hash committee deregistration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashCommitteeDeregistration,
        "There are no off chain tx hash committee deregistration."
      );
    });
  });
});

test("Check the fetch and retry of last off chain content committee deregistration - 5", async ({}) => {
  test.step("GIVEN: Retrieve off chain content committee deregistration", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentCommitteeDeregistration = await retryQuery(
      () => postgres.getLastOffChainContentCommitteeDeregistration(),
      10,
      1000,
      "getOffChainContentCommitteeDeregistration"
    );

    await test.step("THEN: off chain content committee deregistration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentCommitteeDeregistration,
        "There are no off chain content committee deregistration."
      );
    });
  });
});

test("Check the fetch and retry of last valid committee deregistration off chain - 6", async ({}) => {
  test.step("GIVEN: Retrieve last valid committee deregistration off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidConstitution = await retryQuery(
      () => postgres.getLastOffChainValidCommitteeDeregistration(),
      10,
      1000,
      "getLastOffChainValidConstitution"
    );

    await test.step("THEN: valid committee deregistration off chain are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidConstitution,
        "There are no valid committee deregistration off chain."
      );
    });
  });
});

test("Check the fetch and retry of last off chain tx hash committee deregistration - 7", async ({}) => {
  test.step("GIVEN: Retrieve last off chain tx hash committee deregistration", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainTxHashCommitteeDeregistration = await retryQuery(
      () => postgres.getLastOffChainTxHashCommitteeDeregistration(),
      10,
      1000,
      "getLastOffChainTxHashCommitteeDeregistration"
    );

    await test.step("THEN: last off chain tx hash committee deregistration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainTxHashCommitteeDeregistration,
        "There are no off chain tx hash committee deregistration."
      );
    });
  });
});

test("Check the fetch and retry of last off chain content committee deregistration -8", async ({}) => {
  test.step("GIVEN: Retrieve last off chain content committee deregistration", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentCommitteeDeregistration = await retryQuery(
      () => postgres.getLastOffChainContentCommitteeDeregistration(),
      10,
      1000,
      "getLastOffChainContentCommitteeDeregistration"
    );

    await test.step("THEN: last off chain content committee deregistration are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentCommitteeDeregistration,
        "There are no off chain content committee deregistration."
      );
    });
  });
});

test("Check the fetch and retry of last valid committee deregistration off chain - 9", async ({}) => {
  test.step("GIVEN: Retrieve last valid committee deregistration off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidConstitution = await retryQuery(
      () => postgres.getLastOffChainValidCommitteeDeregistration(),
      10,
      1000,
      "getLastOffChainValidConstitution"
    );

    await test.step("THEN: last valid committee deregistration off chain are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidConstitution,
        "There are no valid committee deregistration off chain."
      );
    });
  });
});
