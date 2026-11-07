'use strict';

/**
 * @typedef {Object} SheetData
 * @property {string} title
 */

const model = (() => {
  /**
   * @returns {SheetData}
   */
  function getEmptySheetData() {
    /**
     * TODO
     * Судя добавляем данные на листе.
     *
     * 1. Чемпион — имя, происхождение, путь и род.
     * 2. Характеристики и состояния — Сердца, Выносливость, Дар, характеристики и состояния.
     * 3. Снаряжение — оружие и доспех.
     * 4. Инвентарь — предметы, Зины, ингредиенты и компоненты.
     * 5. Черты и заклинания — родовая черта, черты Пути, изученные заклинания и счётчик Надежды.
     *
     */
    return {
      title: 'Empty champion sheet',
    };
  }

  return {
    getEmptySheetData,
  };
})();
