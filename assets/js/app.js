'use strict';

const app = (() => {
  /**
   * @returns {void}
   */
  function saveSheetFromPage() {
    const sheetData = sheet.readSheetData();

    storage.saveSheetData(sheetData);
  }

  /**
   * @returns {void}
   */
  function start() {
    document.addEventListener('input', saveSheetFromPage);
  }

  return {
    start,
  };
})();

app.start();
