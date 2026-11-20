import { isObjectWithProperty } from '../helpers/is-object-with-property.ts';

export type PlaywrightMatcherResult = {
  actual: unknown;
};

export function isPlaywrightMatcherResult(
  obj: unknown,
): obj is PlaywrightMatcherResult {
  return isObjectWithProperty(obj, 'actual');
}
