import { matchersWithOptions } from "jest-json-schema";

expect.extend(
  matchersWithOptions({
    verbose: true,
  }),
);
