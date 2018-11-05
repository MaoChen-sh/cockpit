const oneDay = 24 * 3600000;
/**
 * @param {date obj} date // 日期
 * @param {string} type // 类型 ['month','year','day']
 * 
 * @returns {obj} // {beginDate,endDate}
 */
const getDateParamsFromDate = (date, type) => {
  if (!date) {
    return {};
  }
  const [year, month, day] = [date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ]
  switch (type) {
    case "month":
      if (month === 12) {
        return {
          beginDate: `${year}-12-01`,
          endDate: `${year}-12-31`
        };
      }
      let finalDay = new Date(
        new Date(`${year}/${+month + 1}/1`) - oneDay
      ).getDate();
      return {
        beginDate: `${year}-${month > 9 ? month : "0" + month}-01`,
        endDate: `${year}-${month > 9 ? month : "0" + month}-${finalDay}`
      };
    case "year":
      return {
        beginDate: `${year}-01-01`,
        endDate: `${year}-12-31`
      };
    default:
      const dayStr = `${year}-${month > 9 ? month : "0" + month}-${day > 9 ? day : "0" + day}`;
      return {
        beginDate: dayStr,
        endDate: dayStr
      };
  }
};

/**
 * @param  {date obj}  date// 日期对象
 * 
 * @returns  {array} [y,m,d] // [1970,1,1]
 */
const getYMD = date => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
}
/**
 *
 */
const getMoney = number => {
  return `￥${number.toLocaleString()}`;
};

export {
  getDateParamsFromDate,
  getYMD,
  getMoney
};