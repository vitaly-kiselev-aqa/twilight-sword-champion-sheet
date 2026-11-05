'use strict';

/**
 * @typedef {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} SheetField
 */

/**
 * @typedef {string | boolean} RawFieldValue
 */

const fields = (() => {
  const FIELD_SELECTOR = '[data-field]';

  /**
   * @param {SheetField} field
   * @returns {string}
   */
  function getKey(field) {
    const key = field.dataset.field;

    if (key === undefined) {
      throw new Error('Sheet field has no data-field attribute');
    }

    return key;
  }

  /**
   * @param {SheetField} field
   * @returns {field is HTMLInputElement}
   */
  function isCheckbox(field) {
    return field.type === 'checkbox';
  }

  /**
   * @param {SheetField} field
   * @returns {RawFieldValue}
   */
  function getRawValue(field) {
    return isCheckbox(field) ? field.checked : field.value;
  }

  /**
   * @param {Element} element
   * @returns {element is SheetField}
   */
  function isSheetField(element) {
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    );
  }

  /**
   * @returns {SheetField[]}
   */
  function getAllFields() {
    const elements = Array.from(document.querySelectorAll(FIELD_SELECTOR));

    const sheetFields = elements.map((element) => {
      if (!isSheetField(element)) {
        throw new Error(
          `Element <${element.tagName}> with ${FIELD_SELECTOR} is unexpected`,
        );
      }

      return element;
    });

    return sheetFields;
  }

  /**
   * @returns {Map<string, RawFieldValue>}
   */
  function getRawValues() {
    /** @type {Map<string, RawFieldValue>} */
    const rawData = new Map();

    const sheetFields = getAllFields();

    sheetFields.forEach((field) => {
      const key = getKey(field);
      const value = getRawValue(field);

      rawData.set(key, value);
    });

    return rawData;
  }

  return {
    getRawValues,
  };
})();
