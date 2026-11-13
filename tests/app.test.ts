// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadScript } from './helpers/load-script.ts';

const sheetData = { title: 'Champion sheet from page' };

function createSheet() {
  return { readSheetData: vi.fn(() => sheetData) };
}

function createStorage() {
  return {
    loadSheetData: vi.fn(() => sheetData),
    saveSheetData: vi.fn(),
  };
}

function typeInField() {
  const input = document.createElement('input');
  input.dataset.field = 'champion.name';
  document.body.append(input);

  input.dispatchEvent(new Event('input', { bubbles: true }));
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('app', () => {
  it('saves the sheet when a field changes', () => {
    const sheet = createSheet();
    const storage = createStorage();
    loadScript('app', { sheet, storage });

    typeInField();

    expect(sheet.readSheetData).toHaveBeenCalledOnce();
    expect(storage.saveSheetData).toHaveBeenCalledWith(sheetData);
  });

  it('saves nothing until a field changes', () => {
    const sheet = createSheet();
    const storage = createStorage();

    loadScript('app', { sheet, storage });

    expect(storage.saveSheetData).not.toHaveBeenCalled();
  });

  it('saves on every change', () => {
    const sheet = createSheet();
    const storage = createStorage();
    loadScript('app', { sheet, storage });

    typeInField();
    typeInField();

    expect(storage.saveSheetData).toHaveBeenCalledTimes(2);
  });
});
