import type {
  ExpectMatcherState,
  Locator,
  MatcherReturnType,
} from '@playwright/test';
import { expect as baseExpect } from '@playwright/test';

import {
  isPlaywrightMatcherResult,
  type PlaywrightMatcherResult,
} from './matcher-result.ts';
import { isObjectWithProperty } from '../helpers/is-object-with-property.ts';
import { formatMatcherMessage } from './format-message.ts';

export async function toBeVisuallyHidden(
  this: ExpectMatcherState,
  locator: Locator,
): Promise<MatcherReturnType> {
  const assertionName = 'toBeVisuallyHidden';
  const expected = 'inset(50%)';

  const result = await callAssertion({
    matcherState: this,
    locator,
    expected,
  });

  const pass = this.isNot ? !result.pass : result.pass;

  const actual = result.pass ? undefined : result.actual;

  const message = formatMatcherMessage({
    matcherState: this,
    assertionName,
    locator,
    expected,
    actual,
    pass,
  });

  return {
    message,
    pass,
    name: assertionName,
    expected,
    actual,
  };
}

type CallAssertionParams = {
  matcherState: ExpectMatcherState;
  locator: Locator;
  expected: string;
};

type CallAssertionResult =
  | { pass: true }
  | {
      pass: false;
      actual?: PlaywrightMatcherResult['actual'];
    };

async function callAssertion({
  matcherState,
  locator,
  expected,
}: CallAssertionParams): Promise<CallAssertionResult> {
  try {
    const expectation = matcherState.isNot
      ? baseExpect(locator).not
      : baseExpect(locator);

    await expectation.toHaveCSS('clip-path', expected);

    return {
      pass: true,
    };
  } catch (error: unknown) {
    if (
      isObjectWithProperty(error, 'matcherResult') &&
      isPlaywrightMatcherResult(error.matcherResult)
    ) {
      const { actual } = error.matcherResult;

      return {
        pass: false,
        actual,
      };
    }

    return {
      pass: false,
    };
  }
}
