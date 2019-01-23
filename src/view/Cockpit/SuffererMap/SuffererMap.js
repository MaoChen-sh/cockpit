import React, { PureComponent } from "react";
import { Chart as ChartBase, BlockArea } from "components";
import styled from "styled-components";
import { TableTemp as Table } from "view/components";
import chinaJson from "echarts/map/json/china.json";
import echarts from "echarts/lib/echarts";
const ChartWrap = styled.div``;
const Chart = styled(ChartBase)`
  display: block;
  width: 95vw;
  height: 93vw;
  background: #fff;
  margin: 10px auto;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

echarts.registerMap("china", chinaJson);
function randomValue() {
  return Math.round(Math.random() * 1000);
}
const Ball = styled.div`
  width: 20px;
  height: 20px;
  color: #fff;
  background: ${p => p.color || "#b7b7b7"};
  line-height: 20px;
  border-radius: 50%;
  font-size: 12px;
  letter-spacing: -1px;
  text-indent: -2px;
  text-align: center;
`;
const ballColors = ["#fed76d", "#6ec4f6", "#65e4a7"];

class SuffererMap extends PureComponent {
  mapData = [
    { name: "重庆", value: [106.54, 29.59, Math.random() * 1000 + 500] },
    { name: "成都", value: [104.06, 30.67, Math.random() * 1000 + 500] },
    { name: "青岛", value: [120.33, 36.07, Math.random() * 1000 + 500] },
    { name: "厦门", value: [118.1, 24.46, Math.random() * 1000 + 500] },
    { name: "昆明", value: [102.73, 25.04, Math.random() * 1000 + 500] },
    { name: "南京", value: [118.78, 32.04, Math.random() * 1000 + 500] },
    { name: "西安", value: [108.95, 34.27, Math.random() * 1000 + 500] },
    { name: "寿光", value: [118.73, 36.86, Math.random() * 1000 + 500] },
    { name: "郑州", value: [113.65, 34.76, Math.random() * 1000 + 500] },
    { name: "武汉", value: [114.31, 30.52, Math.random() * 1000 + 500] }
  ];
  getOptions = data => {
    return {
      title: {
        text: "门诊不同患者来源地图",
        left: "center",
        top: "1.8%",
        textStyle: {
          fontSize: 14,
          color: "#666666"
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1000,
        left: "left",
        top: "bottom",
        text: ["High", "Low"],
        seriesIndex: [1],
        inRange: {
          color: ["#f2f4f1", "#78b5d7"]
        }
      },
      geo: {
        map: "china",
        roam: true,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",
        silent: true,
        itemStyle: {
          normal: {
            borderColor: "rgba(80, 80, 80, 0.2)"
          }
        }
      },
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          name: "患者来源",
          type: "effectScatter",
          coordinateSystem: "geo",
          data: data,
          symbolSize: function(val) {
            return val[2] / 200;
          },
          zlevel: 2,
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}",
              color: "#333"
            }
          },
          itemStyle: {
            normal: {
              color: "#FFB83C"
            }
          }
        },
        {
          type: "map",
          geoIndex: 0,
          data: [
            { name: "北京", value: randomValue() },
            { name: "天津", value: randomValue() },
            { name: "上海", value: randomValue() },
            { name: "重庆", value: randomValue() },
            { name: "河北", value: randomValue() },
            { name: "河南", value: randomValue() },
            { name: "云南", value: randomValue() },
            { name: "辽宁", value: randomValue() },
            { name: "黑龙江", value: randomValue() },
            { name: "湖南", value: randomValue() },
            { name: "安徽", value: randomValue() },
            { name: "山东", value: randomValue() },
            { name: "新疆", value: randomValue() },
            { name: "江苏", value: randomValue() },
            { name: "浙江", value: randomValue() },
            { name: "江西", value: randomValue() },
            { name: "湖北", value: randomValue() },
            { name: "广西", value: randomValue() },
            { name: "甘肃", value: randomValue() },
            { name: "山西", value: randomValue() },
            { name: "内蒙古", value: randomValue() },
            { name: "陕西", value: randomValue() },
            { name: "吉林", value: randomValue() },
            { name: "福建", value: randomValue() },
            { name: "贵州", value: randomValue() },
            { name: "广东", value: randomValue() },
            { name: "青海", value: randomValue() },
            { name: "西藏", value: randomValue() },
            { name: "四川", value: randomValue() },
            { name: "宁夏", value: randomValue() },
            { name: "海南", value: randomValue() },
            { name: "台湾", value: randomValue() },
            { name: "香港", value: randomValue() },
            { name: "澳门", value: randomValue() }
          ]
        }
      ]
    };
  };
  columns = [
    {
      title: "排名",
      render: (ele, index) => (
        <Ball color={ballColors[index]}>{index + 1}</Ball>
      ),
      id: "rank"
    },
    {
      title: "城市",
      render: ele => ele.name,
      id: "city"
    }
  ];
  render() {
    return (
      <ChartWrap>
        <Chart data={this.mapData} getOptions={this.getOptions} />
        <BlockArea title={"门诊人数来源最多的十大城市"}>
          <Table
            noArrow
            columns={this.columns}
            data={this.mapData
              .sort((a, b) => a.value[2] - b.value[2])
              .map((ele, index) => ({ ...ele, id: index }))}
          />
        </BlockArea>
      </ChartWrap>
    );
  }
}

export default SuffererMap;
