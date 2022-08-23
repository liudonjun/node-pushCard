const LocalDate = require("LocalDate");
module.exports = class Birthday {
  constructor(time) {
    this.time = time;
  }
  getGridNumber(key) {
    var today = new LocalDate();
    let date = new Map();
    date.set(2022, new LocalDate(2022, 2, 7));
    date.set(2023, new LocalDate(2023, 1, 28));
    date.set(2024, new LocalDate(2024, 2, 16));
    date.set(2025, new LocalDate(2025, 2, 4));
    date.set(2026, new LocalDate(2026, 2, 23));
    if (date.get(key) - today >= 0) {
      return date.get(key) - today;
    }
    return date.get(key + 1) - today;
  }
  getBoyNumber(key) {
    var today = new LocalDate();
    let date = new Map();
    date.set(2022, new LocalDate(2022, 12, 31));
    date.set(2023, new LocalDate(2024, 1, 19));
    date.set(2024, new LocalDate(2024, 1, 19));
    date.set(2025, new LocalDate(2025, 1, 8));
    date.set(2026, new LocalDate(2026, 1, 27));
    if (date.get(key) - today >= 0) {
      return date.get(key) - today;
    }
    return date.get(key + 1) - today;
  }
};
