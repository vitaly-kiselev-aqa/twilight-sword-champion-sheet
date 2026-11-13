'use strict';

/**
 * @typedef {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} SheetField
 */

/**
 * @typedef {HTMLInputElement & { checked: boolean }} CheckboxField
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
   * @returns {field is CheckboxField}
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
   * @returns {Map<string, SheetField>}
   */
  function getFieldMap() {
    /** @type {Map<string, SheetField>} */
    const fieldsMap = new Map();

    const sheetFields = getAllFields();

    sheetFields.forEach((field) => {
      const key = getKey(field);

      if (fieldsMap.has(key)) {
        throw new Error(`The "${key}" is duplicated`);
      }

      fieldsMap.set(key, field);
    });

    return fieldsMap;
  }

  /**
   * @returns {Map<string, RawFieldValue>}
   */
  function getRawValues() {
    /** @type {Map<string, RawFieldValue>} */
    const rawData = new Map();

    const sheetFields = getFieldMap();

    sheetFields.forEach((field, key) => {
      const value = getRawValue(field);

      rawData.set(key, value);
    });

    return rawData;
  }

  /**
   * @param {CheckboxField} checkbox
   * @param {RawFieldValue} value
   * @returns {void}
   */
  function setCheckboxValue(checkbox, value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Checkbox "${getKey(checkbox)}" expects a boolean value`);
    }

    checkbox.checked = value;
  }

  /**
   * @param {SheetField} textField
   * @param {RawFieldValue} value
   * @returns {void}
   */
  function setTextValue(textField, value) {
    if (typeof value !== 'string') {
      throw new Error(`Field "${getKey(textField)}" expects a string value`);
    }

    textField.value = value;
  }

  /**
   * @param {SheetField} field
   * @param {RawFieldValue} value
   * @returns {void}
   */
  function setRawValue(field, value) {
    if (isCheckbox(field)) {
      setCheckboxValue(field, value);
      return;
    }

    setTextValue(field, value);
  }

  /**
   * @param {Map<string, RawFieldValue>} rawValues
   * @returns {void}
   */
  function setRawValues(rawValues) {
    const sheetFields = getFieldMap();

    rawValues.forEach((value, key) => {
      const field = sheetFields.get(key);

      if (!field) {
        throw new Error(`The "${key}" field does not exist`);
      }

      setRawValue(field, value);
    });
  }

  return {
    getRawValues,
    setRawValues,
  };
})();
