// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadScript } from './helpers/load-script.ts';

const STORAGE_KEY = 'twilight-sword-champion-sheet';

const model = loadScript('model');
const storage = loadScript('storage', { model });

beforeEach(() => {
  localStorage.clear();
});

describe('storage.loadSheetData', () => {
  it('returns empty sheet data when nothing is stored', () => {
    expect(storage.loadSheetData()).toEqual(model.getEmptySheetData());
  });

  it('returns stored sheet data', () => {
    const storedSheetData = { title: 'Champion data' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedSheetData));

    expect(storage.loadSheetData()).toEqual(storedSheetData);
  });

  it('returns empty sheet data and logs an error when JSON is broken', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    localStorage.setItem(STORAGE_KEY, '{ broken json');

    expect(storage.loadSheetData()).toEqual(model.getEmptySheetData());
    expect(consoleError).toHaveBeenCalledOnce();
  });

  it.each(['null', '42', '"text"', 'true', ''])(
    'returns empty sheet data when stored data is not an object: "%s"',
    (storedText) => {
      localStorage.setItem(STORAGE_KEY, storedText);

      expect(storage.loadSheetData()).toEqual(model.getEmptySheetData());
    },
  );
});

describe('storage.saveSheetData', () => {
  it('stores sheet data as JSON under the sheet key', () => {
    const sheetData = { title: 'Champion data' };

    storage.saveSheetData(sheetData);

    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(sheetData));
  });

  it('saves data that loadSheetData restores', () => {
    const sheetData = { title: 'Another champion data' };

    storage.saveSheetData(sheetData);

    expect(storage.loadSheetData()).toEqual(sheetData);
  });

  it('overwrites previously saved data', () => {
    storage.saveSheetData({ title: 'First' });
    storage.saveSheetData({ title: 'Second' });

    expect(storage.loadSheetData()).toEqual({ title: 'Second' });
  });
});
