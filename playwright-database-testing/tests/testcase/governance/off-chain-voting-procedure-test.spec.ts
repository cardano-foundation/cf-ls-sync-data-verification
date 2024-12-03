import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { PostgreSQL } from "@helpers/database/database.helper";
import { retryQuery } from "@helpers/database/retry-query.helper";
import { test } from "@playwright/test";

test.describe("@regression @off-chain", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the fetch and retry of voting procedure off chain - 1", async ({}) => {
    test.step("GIVEN: Retrieve voting procedure off chain", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let getOffChainVotingProcedure = await retryQuery(
        () => postgres.getOffChainVotingProcedure(),
        10,
        1000,
        "getOffChainVotingProcedure"
      );

      await test.step("THEN: off chain voting procedure off chain are being fetch after retry", () => {
        Assertions.assertNotNull(
          getOffChainVotingProcedure,
          "There are no off chain voting procedure."
        );
      });
    });
  });
});

test("Check the fetch and retry of off chain content procedure - 2", async ({}) => {
  test.step("GIVEN: Retrieve off chain content procedure", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentProcedure = await retryQuery(
      () => postgres.getOffChainContentProcedure(),
      10,
      1000,
      "getOffChainContentProcedure"
    );

    await test.step("THEN: off chain content procedure are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentProcedure,
        "There are no off chain content procedure."
      );
    });
  });
});

test("Check the fetch and retry of off chain valid procedure - 3", async ({}) => {
  test.step("GIVEN: Retrieve off chain valid procedure", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainCheckValidProcedure = await retryQuery(
      () => postgres.getOffChainCheckValidProcedure(),
      10,
      1000,
      "getOffChainCheckValidProcedure"
    );

    await test.step("THEN: off chain content procedure are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainCheckValidProcedure,
        "There are no off chain content procedure."
      );
    });
  });
});

test("Check the fetch and retry of last voting procedure off chain - 4", async ({}) => {
  test.step("GIVEN: Retrieve last voting procedure off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let getOffChainVotingProcedure = await retryQuery(
      () => postgres.getOffChainVotingProcedure(),
      10,
      1000,
      "getOffChainVotingProcedure"
    );

    await test.step("THEN: off chain voting procedure off chain are being fetch after retry", () => {
      Assertions.assertNotNull(
        getOffChainVotingProcedure,
        "There are no off chain voting procedure."
      );
    });
  });
});

test("Check the fetch and retry of last off chain content procedure - 5", async ({}) => {
  test.step("GIVEN: Retrieve last off chain content procedure", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainContentProcedure = await retryQuery(
      () => postgres.getLastOffChainContentProcedure(),
      10,
      1000,
      "getLastOffChainContentProcedure"
    );

    await test.step("THEN: last off chain content procedure are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainContentProcedure,
        "There are no off chain content procedure."
      );
    });
  });
});

test("Check the fetch and retry of last off chain valid procedure -6", async ({}) => {
  test.step("GIVEN: Retrieve last off chain valid procedure", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainCheckValidProcedure = await retryQuery(
      () => postgres.getLastOffChainCheckValidProcedure(),
      10,
      1000,
      "getOffChainCheckValidProcedure"
    );

    await test.step("THEN: off chain content procedure are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainCheckValidProcedure,
        "There are no off chain content procedure."
      );
    });
  });
});
