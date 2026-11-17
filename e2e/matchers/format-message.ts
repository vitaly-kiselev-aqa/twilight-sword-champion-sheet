import type { ExpectMatcherState, Locator } from '@playwright/test';

type Params = {
  matcherState: ExpectMatcherState;
  assertionName: string;
  locator: Locator;
  expected: unknown;
  actual?: unknown;
  pass: boolean;
};

export function formatMatcherMessage(params: Params): () => string {
  const { matcherState, assertionName, locator, expected, actual, pass } =
    params;

  const { utils } = matcherState;

  const getHint = (): string => {
    const { isNot } = matcherState;
    const hint = utils.matcherHint(assertionName, 'locator', '', {
      isNot,
    });

    return `${hint}\n\nLocator: ${locator}\n`;
  };

  const getExpected = (pass: boolean): string => {
    const prettyExpected = utils.printExpected(expected);

    const expectedLine = pass
      ? `Expected: not ${prettyExpected}`
      : `Expected: ${prettyExpected}`;

    return `${expectedLine}\n`;
  };

  const getReceived = (): string =>
    actual ? `Received: ${utils.printReceived(actual)}` : '';

  const getMessage = () => getHint() + getExpected(pass) + getReceived();

  return getMessage;
}
