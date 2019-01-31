export default {
  getChartAreaProps: _this => {
    return {
      title: "本月每日在院人数统计",
      to: "/cockpit/hospital/in/diseasedetail"
    };
  },
  getHeaderProps: state => {
    const { inHospital, death, icu } = state;
    return {
      title: "在院人数",
      count: inHospital,
      subList: [
        { title: "住院患者死亡人数", count: death },
        { title: "监护室", count: icu }
      ]
    };
  },
  getListAreaProps: () => {
    return {
      title: "不同科室和病区的在院人数"
    };
  },
  getChartData: state => state.listIn
};
