const oneDay = 24 * 3600 * 1000;
const getDateParamsFromDateStr = (date, type) => {
  switch (type) {
    case "month":
      const [year, month] = date.match(/\d+/g);
      if (month === 12) {
        return {
          beginDate: `${year}-12-01`,
          endDate: `${year}-12-31`
        };
      }
      let day = new Date(
        new Date(`${year}/${+month + 1}/1`) - oneDay
      ).getDate();
      return {
        beginDate: `${year}-${month > 9 ? month : "0" + month}-01`,
        endDate: `${year}-${month > 9 ? month : "0" + month}-${day}`
      };
    case "year":
      return {};
    default:
      day = date
        .match(/\d+/g)
        .map(ele => (ele < 10 ? "0" + ele : ele))
        .join("-");
      return {
        beginDate: day,
        endDate: day
      };
  }
};

export { getDateParamsFromDateStr };
