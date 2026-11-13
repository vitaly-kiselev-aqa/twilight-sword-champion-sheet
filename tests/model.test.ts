import { describe, expect, it } from 'vitest';
import { loadScript } from './helpers/load-script.ts';

const model = loadScript('model');

describe('model.getEmptySheetData', () => {
  it('returns sheet data with a title', () => {
    expect(model.getEmptySheetData()).toEqual({
      title: 'Empty champion sheet',
    });
  });

  it('returns a new object on every call', () => {
    const first = model.getEmptySheetData();
    first.title = 'Changed';

    expect(model.getEmptySheetData()).not.toBe(first);
    expect(model.getEmptySheetData().title).not.toBe('Changed');
  });
});
