'use strict';

const sheet = (() => {
  /**
   * @returns {SheetData}
   */
  function readSheetData() {
    const rawValues = fields.getRawValues();

    return {
      title: 'Champion sheet from page',
    };
  }

  return {
    readSheetData,
  };
})();
