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
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ];
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
      const dayStr = `${year}-${month > 9 ? month : "0" + month}-${
        day > 9 ? day : "0" + day
      }`;
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
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};
/**
 *
 */
const getMoney = number => {
  return `￥${(+number).toLocaleString()}`;
};
/**
 *
 */
const getSearch = searchStr => {
  return searchStr.match(/[^&?]+=[^&?]+/g).reduce((result, ele) => {
    const [key, value] = ele.split("=");
    return { ...result, [key]: value };
  }, {});
};
/**
 *
 */
const random = (min, max, fixedNum = 0) => {
  return (Math.random() * (max - min) + min).toFixed(fixedNum);
};
/**
 *
 */
const addZero = num => {
  return num >= 10 ? String(num) : "0" + num;
};
/**
 *
 */
const getTimeStrFromSecond = second => {
  const h = Math.floor(second / 3600);
  const m = Math.floor((second % 3600) / 60);
  const s = Math.floor(second % 60);
  return `${h ? h + "时" : ""}${m ? addZero(m) + "分" : ""}${
    s ? addZero(s) + "秒" : ""
  }`;
};

export {
  getDateParamsFromDate,
  getYMD,
  getMoney,
  getSearch,
  random,
  addZero,
  getTimeStrFromSecond
};
