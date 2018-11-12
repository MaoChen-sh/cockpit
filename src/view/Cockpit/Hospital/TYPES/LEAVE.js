export default {
  getChartAreaProps: () => {
    return {
      title: "本月每天出院人数统计"
    };
  },
  getHeaderProps: state => {
    const { leaveHospital, autoLeave } = state;
    return {
      title: "出院人数",
      count: leaveHospital,
      subList: [{ title: "患者自动出院人数", count: autoLeave }]
    };
  },
  getListAreaProps: () =>{
    return {
      title: "不同科室和病区的出院人数"
    }
  },
  getChartData: state => state.listLeave

};
