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

  test("Check the fetch and retry of consitution off chain - 1", async ({}) => {
    test.step("GIVEN: Retrieve consitution off chain", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
      let offChainConsitution = await retryQuery(
        () => postgres.getOffChainConsitution(),
        10,
        1000,
        "getOffChainConsitution"
      );

      await test.step("THEN: off chain consitution are being fetch after retry", () => {
        Assertions.assertNotNull(
          offChainConsitution,
          "There are no off chain consitution ."
        );
      });
    });
  });
});

test("Check the fetch and retry of off chain consitution active epoch - 2", async ({}) => {
  test.step("GIVEN: Retrieve off chain consitution active epoch", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainConsitutionActiveEpoch = await retryQuery(
      () => postgres.getOffChainConsitutionActiveEpoch(),
      10,
      1000,
      "getOffChainConsitutionActiveEpoch"
    );

    await test.step("THEN: off chain consitution active epoch are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainConsitutionActiveEpoch,
        "There are no off chain consitution active epoch."
      );
    });
  });
});

test("Check the fetch and retry of off chain consitution content - 3", async ({}) => {
  test.step("GIVEN: Retrieve off chain consitution content", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainConsitutionContent = await retryQuery(
      () => postgres.getOffChainConsitutionContent(),
      10,
      1000,
      "getOffChainConsitutionContent"
    );

    await test.step("THEN: off chain consitution content are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainConsitutionContent,
        "There are no off chain consitution content."
      );
    });
  });
});

test("Check the fetch and retry of valid constituion off chain - 4", async ({}) => {
  test.step("GIVEN: Retrieve valid constituion off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidConstitution = await retryQuery(
      () => postgres.getOffChainValidConstitution(),
      10,
      1000,
      "getOffChainValidConstitution"
    );

    await test.step("THEN: valid constituion off chain are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidConstitution,
        "There are no valid constituion off chain."
      );
    });
  });
});

test("Check the fetch and retry of last off chain consitution active epoch - 5", async ({}) => {
  test.step("GIVEN: Retrieve last off chain consitution active epoch", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainConsitutionActiveEpoch = await retryQuery(
      () => postgres.getLastOffChainConsitutionActiveEpoch(),
      10,
      1000,
      "getLastOffChainConsitutionActiveEpoch"
    );

    await test.step("THEN: off chain consitution active epoch are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainConsitutionActiveEpoch,
        "There are no off chain consitution active epoch."
      );
    });
  });
});

test("Check the fetch and retry of last off chain consitution content - 6", async ({}) => {
  test.step("GIVEN: Retrieve last off chain consitution content", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainConsitutionContent = await retryQuery(
      () => postgres.getLastOffChainConsitutionContent(),
      10,
      1000,
      "getLastOffChainConsitutionContent"
    );

    await test.step("THEN: off chain consitution content are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainConsitutionContent,
        "There are no off chain consitution content."
      );
    });
  });
});

test("Check the fetch and retry of last valid constituion off chain - 7", async ({}) => {
  test.step("GIVEN: Retrieve last valid constituion off chain", async () => {
    const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME);
    let offChainValidConstitution = await retryQuery(
      () => postgres.getLastOffChainValidConstitution(),
      10,
      1000,
      "getLastOffChainValidConstitution"
    );

    await test.step("THEN: valid constituion off chain are being fetch after retry", () => {
      Assertions.assertNotNull(
        offChainValidConstitution,
        "There are no valid constituion off chain."
      );
    });
  });
});
