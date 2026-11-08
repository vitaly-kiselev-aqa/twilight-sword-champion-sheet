import { describe, expect, it, vi } from 'vitest';
import { loadScript } from './helpers/load-script.js';

describe('sheet.readSheetData', () => {
  it('reads raw values from page fields', () => {
    const fields = { getRawValues: vi.fn(() => new Map()) };
    const sheet = loadScript('sheet', { fields });

    sheet.readSheetData();

    expect(fields.getRawValues).toHaveBeenCalledOnce();
  });

  it('returns sheet data with a title', () => {
    const fields = { getRawValues: () => new Map() };
    const sheet = loadScript('sheet', { fields });

    expect(sheet.readSheetData()).toEqual({
      title: 'Champion sheet from page',
    });
  });
});
