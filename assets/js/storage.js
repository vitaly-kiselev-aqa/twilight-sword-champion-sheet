'use strict';

const storage = (() => {
  const STORAGE_KEY = 'twilight-sword-champion-sheet';

  /**
   * @param {string} text
   * @returns {unknown}
   */
  function parseStoredContent(text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Error parsing stored character sheet:', error);
      return null;
    }
  }

  /**
   * @param {unknown} value
   * @returns {value is SheetData}
   */
  function isSheetData(value) {
    return typeof value === 'object' && value !== null;
  }

  /**
   * @returns {SheetData}
   */
  function loadSheetData() {
    const emptySheetData = model.getEmptySheetData();

    const localStorageContent = localStorage.getItem(STORAGE_KEY);

    if (!localStorageContent) {
      return emptySheetData;
    }

    const storedSheetData = parseStoredContent(localStorageContent);

    if (!isSheetData(storedSheetData)) {
      return emptySheetData;
    }

    return storedSheetData;
  }

  /**
   * @param {SheetData} sheetData
   * @returns {void}
   */
  function saveSheetData(sheetData) {
    const strData = JSON.stringify(sheetData);
    localStorage.setItem(STORAGE_KEY, strData);
  }

  return {
    loadSheetData,
    saveSheetData,
  };
})();
