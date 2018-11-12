export default {
  patientSafe: {
    title: "患者安全管理",
    description: "包括院内患者、手术患者相关并发症、信息上报三大类",
    children: {
      inHospital: {
        title: "院内患者",
        testData: [
          {
            name: "住院患者出院31天内再住院率"
          },
          {
            name: "住院患者当天出院再住院率"
          },
          {
            name: "住院患者压疮发生率"
          },
          {
            name: "院内跌倒/坠床发生率"
          },
          {
            name: "院内跌倒/坠床制定伤害严重程度发生率"
          },
          {
            name: "住院患者人工气道意外脱出率"
          },
          {
            name: "输血反应发生率"
          },
          {
            name: "输液反应发生率"
          }
        ]
      },
      surgery: {
        title: "手术患者",

        description: "统计19种数据",

        testData: [
          {
            name: "手术患者总住院死亡率"
          },
          {
            name: "手术患者并发症发生率"
          },
          {
            name: "择期手术患者医院感染发生率"
          },
          {
            name: "择期手术患者肺部感染发生率"
          },
          {
            name: "手术患者手术后肺栓塞发生率"
          },
          {
            name: "手术患者手术后深静脉血栓发生率"
          },
          {
            name: "手术患者手术后败血症发生率"
          },
          {
            name: "手术患者手术后出血或血肿发生率"
          }
        ]
      },
      msgReport: {
        title: "信息上报",

        description: "统计13种数据",

        testData: [
          {
            name: "异常事件上报例数"
          },
          {
            name: "几近过失上报例率"
          },
          {
            name: "门急诊投诉率"
          },
          {
            name: "住院投诉率"
          }
        ]
      }
    }
  },
  hospitalInfection: {
    title: "医院感染管理",
    description: "统计19种数据",
    testData: [
      { name: "医院感染发病例次数" },
      { name: "医院感染发病率" },
      { name: "医院感染现患例次数" },
      { name: "医院感染现患率" },
      { name: "医院感染发病例次数" },
      { name: "医院感染病例漏报率" },
      { name: "多重耐药菌感染发生率" },
      { name: "医务人员手卫生依从性" }
    ]
  },
  drugManage: {
    title: "药事管理检测",
    description: "统计13种数据",
    testData: [
      { name: "每次就诊人均用药品种数" },
      { name: "每次就诊人均药费" },
      { name: "就诊使用抗菌药物的百分率" },
      { name: "就诊使用注射药物的百分率" },
      { name: "基本药物占处方用药的百分率" },
      { name: "住院患者人均使用抗菌药物品种数" },
      { name: "住院患者人均使用抗菌药物费用" },
      { name: "住院患者使用抗菌药物的百分率" },
      { name: "抗菌药物使用强度" }
    ]
  },
  clinicalPathway: {
    title: "临床路径管理",
    description: "统计18种数据",
    testData: [
      { name: "医院临床路径总病种数" },
      { name: "各病种临床路径入组率" },
      { name: "入组后完成率" },
      { name: "变异率" },
      { name: "平均住院费用" },
      { name: "平均住院日" },
      { name: "死亡率" }
    ]
  },
  hocus: {
    title: "麻醉专业质量控制指标",
    description: "统计19种数据",
    testData: [
      { name: "麻醉科医患比" },
      { name: "各ASA分级麻醉患者比例" },
      { name: "急诊非择期麻醉比例" },
      { name: "各类麻醉方式比例" },
      { name: "麻醉开始后后手术取消率" },
      { name: "麻醉后监测治疗室（PACU)转出延迟率" },
      { name: "PACU入室低体温率" },
      { name: "非计划转入ICU率" },
      { name: "非计划二次气管插管率" }
    ]
  },
  seriousIllness: {
    title: "重症医学专业医疗质量指标",
    description: "统计19种数据",
    testData: [
      { name: "ICU患者收治率" },
      { name: "ICU患者收治床日率" },
      { name: "急诊非择期麻醉比例" },
      { name: "急性生理与慢性健康评分（APACHEⅡ评分）≥15分患者收治率" },
      { name: "感染性休克3h集束化治疗（bundle）完成率" },
      { name: "感染性休克6h集束化治疗（bundle）完成率" },
      { name: "CU抗菌药物治疗前病原学送检率" },
      { name: "ICU患者预计病死率" },
      { name: "ICU患者标化病死指数" }
    ]
  },
  emergencyDepartment: {
    title: "急诊专业医疗质量指标",
    description: "统计12种数据",
    testData: [
      { name: "急诊科医患比" },
      { name: "急诊科护患比" },
      { name: "急诊各级患者比例" },
      { name: "抢救室滞留时间中位数" },
      { name: "急性心肌梗死(STEMI）患者平均门药时间" },
      { name: "急性心肌梗死(STEMI）门药时间达标率" },
      { name: "急性心肌梗死（STEMI)患者平均门球时间" },
      { name: "急性心肌梗死（STEMI)患者门球时间达标率" },
      { name: "急诊抢救室患者死亡率" }
    ]
  },
  clinical: {
    title: "临床检验专业医疗质量指标",
    description: "统计12种数据",
    testData: [
      { name: "每百张病床病理医师数" },
      { name: "每百张病床病理技术人员数" },
      { name: "标本规范化固定率" },
      { name: "HE染色切片优良率" },
      { name: "免疫组化染色切片优良率" },
      { name: "术中快速病理诊断及时率" },
      { name: "组织病理诊断及时率" },
      { name: "细胞病理诊断及时率" },
      { name: "各项分子病理检测室内质控合格率" }
    ]
  },
  obstetrics: {
    title: "产儿科医疗质量指标",
    testData: [
      { name: "产妇总数" },
      { name: "产后出血发生率" },
      { name: "剖宫产率" },
      { name: "HE染色切片优良率" },
      { name: "阴道分娩产妇产伤发生率" },
      { name: "阴道助产率" },
      { name: "顺转剖比率" },
      { name: "初产&足月&单胎&头位（NTSV）的产妇剖宫产率" },
      { name: "足月引产率" }
    ]
  }
};
