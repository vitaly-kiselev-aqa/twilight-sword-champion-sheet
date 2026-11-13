// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import { loadScript } from './helpers/load-script.ts';

const fields = loadScript('fields');

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('fields.getRawValues', () => {
  it('returns an empty map when the page has no fields', () => {
    expect(fields.getRawValues()).toEqual(new Map());
  });

  it('gets values by data-field', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" value="Ария" />
      <textarea data-field="traits">Ловкая</textarea>
    `;

    expect(fields.getRawValues()).toEqual(
      new Map([
        ['champion.name', 'Ария'],
        ['traits', 'Ловкая'],
      ]),
    );
  });

  it('gets number inputs as strings', () => {
    document.body.innerHTML = `
      <input type="number" data-field="attribute.strength" value="3" />
      <input type="number" data-field="attribute.agility" />
    `;

    expect(fields.getRawValues()).toEqual(
      new Map([
        ['attribute.strength', '3'],
        ['attribute.agility', ''],
      ]),
    );
  });

  it('gets checkboxes as booleans', () => {
    document.body.innerHTML = `
      <input type="checkbox" data-field="condition.poison" checked />
      <input type="checkbox" data-field="condition.stun" />
    `;

    expect(fields.getRawValues()).toEqual(
      new Map([
        ['condition.poison', true],
        ['condition.stun', false],
      ]),
    );
  });

  it('gets updated values', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" value="Ария" />
      <input type="checkbox" data-field="condition.fear" />
    `;

    const nameInput = document.querySelector('[data-field="champion.name"]');
    const fearCheckbox = document.querySelector(
      '[data-field="condition.fear"]',
    );

    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(fearCheckbox instanceof HTMLInputElement)
    ) {
      throw new Error('Test fields are missing');
    }

    nameInput.value = 'Борис';
    fearCheckbox.checked = true;

    expect(fields.getRawValues()).toEqual(
      new Map(
        Object.entries({ 'champion.name': 'Борис', 'condition.fear': true }),
      ),
    );
  });

  it('ignores elements without data-field', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" value="Ария" />
      <input name="search" value="ignored" />
    `;

    expect(fields.getRawValues()).toEqual(new Map([['champion.name', 'Ария']]));
  });

  it('throws when data-field is set on a non-form element', () => {
    document.body.innerHTML = `<div data-field="champion.name"></div>`;

    expect(() => fields.getRawValues()).toThrow(
      'Element <DIV> with [data-field] is unexpected',
    );
  });

  it('throws when two fields share a data-field', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" value="Ария" />
      <input data-field="champion.name" value="Борис" />
    `;

    expect(() => fields.getRawValues()).toThrow(
      'The "champion.name" is duplicated',
    );
  });
});

function getFieldByKey(key: string): HTMLInputElement | HTMLTextAreaElement {
  const element = document.querySelector(`[data-field="${key}"]`);

  if (
    !(element instanceof HTMLInputElement) &&
    !(element instanceof HTMLTextAreaElement)
  ) {
    throw new Error(`Test field ${key} is missing`);
  }

  return element;
}

function getCheckboxByKey(key: string): HTMLInputElement {
  const element = getFieldByKey(key);

  if (!(element instanceof HTMLInputElement) || element.type !== 'checkbox') {
    throw new Error(`Test checkbox ${key} is missing`);
  }

  return element;
}

describe('fields.setRawValues', () => {
  it('sets text values by data-field', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" />
      <input type="number" data-field="attribute.strength" />
      <textarea data-field="traits"></textarea>
    `;

    fields.setRawValues(
      new Map([
        ['champion.name', 'Ария'],
        ['attribute.strength', '3'],
        ['traits', 'Ловкая'],
      ]),
    );

    expect(getFieldByKey('champion.name').value).toBe('Ария');
    expect(getFieldByKey('attribute.strength').value).toBe('3');
    expect(getFieldByKey('traits').value).toBe('Ловкая');
  });

  it('sets checkboxes from booleans', () => {
    document.body.innerHTML = `
      <input type="checkbox" data-field="condition.poison" />
      <input type="checkbox" data-field="condition.stun" checked />
    `;

    fields.setRawValues(
      new Map([
        ['condition.poison', true],
        ['condition.stun', false],
      ]),
    );

    expect(getCheckboxByKey('condition.poison').checked).toBe(true);
    expect(getCheckboxByKey('condition.stun').checked).toBe(false);
  });

  it('leaves fields without a value unchanged', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" value="Ария" />
      <input type="checkbox" data-field="condition.fear" checked />
    `;

    fields.setRawValues(new Map());

    expect(getFieldByKey('champion.name').value).toBe('Ария');
    expect(getCheckboxByKey('condition.fear').checked).toBe(true);
  });

  it('throws when a value has no matching field', () => {
    document.body.innerHTML = `<input data-field="champion.name" />`;

    const rawValues = new Map([
      ['champion.name', 'Ария'],
      ['champion.origin', 'Север'],
    ]);

    expect(() => fields.setRawValues(rawValues)).toThrow(
      'The "champion.origin" field does not exist',
    );
  });

  it('restores values read by getRawValues', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" value="Ария" />
      <input type="checkbox" data-field="condition.fear" checked />
    `;

    const rawValues = fields.getRawValues();

    getFieldByKey('champion.name').value = '';
    getCheckboxByKey('condition.fear').checked = false;

    fields.setRawValues(rawValues);

    expect(fields.getRawValues()).toEqual(rawValues);
  });

  it('throws when a checkbox gets a string', () => {
    document.body.innerHTML = `<input type="checkbox" data-field="condition.poison" />`;

    expect(() =>
      fields.setRawValues(new Map([['condition.poison', 'true']])),
    ).toThrow('Checkbox "condition.poison" expects a boolean value');
  });

  it('throws when a text field gets a boolean', () => {
    document.body.innerHTML = `<input data-field="champion.name" />`;

    expect(() =>
      fields.setRawValues(new Map([['champion.name', true]])),
    ).toThrow('Field "champion.name" expects a string value');
  });

  it('throws when data-field is set on a non-form element', () => {
    document.body.innerHTML = `<div data-field="champion.name"></div>`;

    expect(() =>
      fields.setRawValues(new Map([['champion.name', 'Ария']])),
    ).toThrow('Element <DIV> with [data-field] is unexpected');
  });

  it('throws when two fields share a data-field', () => {
    document.body.innerHTML = `
      <input data-field="champion.name" />
      <input data-field="champion.name" />
    `;

    expect(() =>
      fields.setRawValues(new Map([['champion.name', 'Ария']])),
    ).toThrow('The "champion.name" is duplicated');
  });
});
