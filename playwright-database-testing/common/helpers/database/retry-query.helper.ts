export async function retryQuery<T>(
  queryFunc: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
  funcName: string = "Function"
): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      console.log(`Attempt ${attempt + 1} for ${funcName}`);
      return await queryFunc();
    } catch (error: unknown) {
      attempt++;
      if (attempt >= retries) {
        console.error(`All ${retries} attempts failed for ${funcName}`);
        if (error instanceof Error) {
          throw new Error(
            `Failed after ${retries} retries for ${funcName}: ${error.message}`
          );
        } else {
          throw new Error(
            `Failed after ${retries} retries for ${funcName}: Unknown error occurred`
          );
        }
      }
      if (error instanceof Error) {
        console.warn(
          `Attempt ${attempt} failed for ${funcName}: ${error.message}. Retrying in ${delay}ms...`
        );
      } else {
        console.warn(
          `Attempt ${attempt} failed for ${funcName}: Unknown error. Retrying in ${delay}ms...`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  throw new Error("Unexpected error in retry loop");
}
