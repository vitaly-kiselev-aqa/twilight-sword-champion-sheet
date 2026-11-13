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
});
