import React, { Component } from 'react';
import echarts from "echarts";

/*
* 折线图组件 简单封装
* @author xf
* 可用接口：y轴单位，width，height，data
* */

export default class LineChartSolidDashed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [
      //   {
      //     data1: [100, 150, 120, 90],
      //     data2: [undefined, undefined, undefined, 90, 160, 90]
      //   },
      //   {
      //     data1: [50, 100, 140, 100],
      //     data2: [undefined, undefined, undefined, 100, 120, 50]
      //   }
      // ]
    };
  };

  _setData(d) {
    this.flag = true;
    this.setState({ data: d });
  };

  render() {
    return (
      <div ref="line" style={{ width: this.props.width, height: this.props.height, position: "absolute" }}></div>
    )
  };

  componentDidUpdate() {
    if (!this.state.data) { return };
    if (this.flag) { this.flag = false } else { return };
    let myChart = echarts.init(this.refs.line);
    let me = this;
    let imgName = me.props.imgName || ["chartCircleBlue", "chartCirclePink"];
    let lineColor = ["#25ffff", "#ff056b", "#f0f920", "#fe4e40", "#f647c7", "#1387fe", "#c522e8", "#2aff00", "#25ffff", "#ff056b", "#f0f920", "#fe4e40", "#f647c7", "#1387fe", "#c522e8", "#2aff00", "#25ffff", "#ff056b", "#f0f920", "#fe4e40", "#f647c7", "#1387fe", "#c522e8", "#2aff00"];
    let AreaColor = [
      ["rgba(37,255,255,1)", "rgba(37,255,255,0)"],
      ["rgba(255,5,107,1)", "rgba(255,5,107,0)"],
      ["rgba(240,249,32,1)", "rgba(240,249,32,0)"],
      ["rgba(254,78,64,1)", "rgba(254,78,64,0)"],
      ["rgba(246,71,199,1)", "rgba(246,71,199,0)"],
      ["rgba(19,135,254,1)", "rgba(19,135,254,0)"],
      ["rgba(197,34,232,1)", "rgba(197,34,232,0)"],
      ["rgba(42,255,0,1)", "rgba(42,255,0,0)"]
    ];
    let lineColors = [];
    lineColor.map(s => {
      lineColors.push(s);
      lineColors.push(s);
    });
    let options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#12ffff",
            width: 2
          }
        },
        formatter: s => {
          let yname = me.props.yaxisName ? me.props.yaxisName.match(/单位：(.+)/)[1] : "";
          let str = `${s[0].name}`;
          let temp = 0;
          let count = 0;
          s.forEach(k => {
            count++
            if (!k.data) { temp++ }
          });
          if (temp == 0) {
            s.forEach((k, i) => {
              if (i % 2 == 0) {
                if (k.data) {
                  str += `<br />${k.marker}${k.seriesName} ${k.data}${yname}`;
                }
              }
            })
          } else {
            s.forEach((k, i) => {
              if (k.data) {
                str += `<br />${k.marker}${k.seriesName} ${k.data}${yname}`;
              }
            })
          }
          return str
        }
      },
      grid: {
        top: "15%",
        left: '20px;',
        right: '20px',
        bottom: '0',
        containLabel: true
      },
      textStyle: {
        color: "#12ffff"
      },
      color: lineColor,
      xAxis: [
        {
          type: 'category',
          data: this.state.data.dataX,
          axisLine: {
            lineStyle: {
              color: '#1665be'
            },
            symbol: this.props.arrow ? ["none", "arrow"] : [],
            symbolSize: [5, 8]
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: false,
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: this.props.yaxisName,
          nameGap: 22,
          nameTextStyle: {
            fontSize: 18
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: false,
          splitLine: {
            lineStyle: {
              color: "#044595",
              type: "dashed",
              opacity: ".6"
            }
          },
          axisLine: {
            lineStyle: {
              color: '#1665be'
            },
            symbol: this.props.arrow ? ["none", "arrow"] : [],
            symbolSize: [5, 8]
          },
          splitNumber: 4,
          scale: true
        }
      ],
      series: []
    };
    me.state.data.data.map((s, i) => {
      let seriesData = [{
        name: me.state.data.name[i],
        type: 'line',
        showSymbol: false,
        symbol: "circle",
        // symbol: `image:///static/image/chart-symbol/${imgName[i]}.png`,
        // symbolSize: 22,
        lineStyle: {
          normal: {
            color: lineColor[i],
            width: 3,
            shadowColor: lineColor[i],
            shadowBlur: 10,
          }
        },
        areaStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: lineColor[i]
                },
                {
                  offset: 1,
                  // color: AreaColor[i][1]
                  color: "transparent"
                }
              ]
            }
          }
        },
        data: [100, 150, 120, 90]
      },
      {
        name: me.state.data.name[i],
        type: "line",
        showSymbol: false,
        symbol: "circle",
        // symbol: `image:///static/image/chart-symbol/${imgName[i]}.png`,
        // symbolSize: 22,
        lineStyle: {
          normal: {
            // color: lineColor[i],
            width: 3,
            // shadowColor: lineColor[i],
            shadowBlur: 10,
          }
        },
        itemStyle: {
          normal: {
            lineStyle: {
              width: 2,
              type: 'dashed'
            }
          }
        },
        data: [undefined, undefined, undefined, 90, 160, 90]
      }];
      seriesData[0].data = s.data1;
      seriesData[1].data = s.data2;

      options.series = options.series.concat(seriesData);
    });
    myChart.setOption(options, true);
  };
};
