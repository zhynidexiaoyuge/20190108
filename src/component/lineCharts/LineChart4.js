import React, { Component } from 'react';
import echarts from "echarts";

/*
* 折线图组件 简单封装
* 可用接口：y轴单位，width，height，data
* */

export default class LineChartOneArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  _setData(d) {
    // console.log(d);
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
    let imgName = me.props.imgName || "chartCircleBlue";
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
        formatter: "{b}</br>{c}" + me.props.yaxisName.match(/单位：(.+)/)[1]
      },
      dataZoom: me.props.dataZoom ? [
        {
          type: 'slider',
          throttle: 500,
          textStyle: {
            color: '#12ffff',
            fontSize: 14
          },
          bottom: me.props.handleBottom || '20px',
          left: me.props.handleLeft || '10%',
          right: me.props.handleRight || '7%',
          show: true,
          start: me.props.zoomStart || 20,
          end: me.props.zoomEnd || 70,
          backgroundColor: me.props.bgColor || '#0875d4',
          height: me.props.handleHeight || "20px",
          borderColor: 'none',
          fillerColor: me.props.barColor || '#458cbf',
          handleIcon: me.props.handleIcon ? "M204.5,55.5l4,0l0,50l-4,0l0,-50z" : `image:///static/image/chart-symbol/handleIcon.png`,
          handleSize: me.props.handleSize || "20px",
        }
      ] : [],
      grid: {
        top: me.props.top || "60px",
        left: '5%',
        right: '4%',
        bottom: '60px',
        containLabel: true
      },
      textStyle: {
        color: "#12ffff"
      },
      color: "#54effb",
      xAxis: [
        {
          type: 'category',
          data: me.state.data.dataDate,
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
          // axisTick: false,
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: this.props.yaxisName,
          nameTextStyle: {
            fontSize: 18
          },
          axisLabel: {
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#044595",
              type: "dashed",
              opacity: ".6"
            }
          },
          axisLabel: {
            fontSize: 16
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
      series: [
        {
          name: '当前',
          type: 'line',
          showSymbol: false,
          symbol: `image:///static/image/chart-symbol/${imgName}.png`,
          symbolSize: 17,
          lineStyle: {
            normal: {

              color: this.props.lineColor || "rgba(18,255,255,1)",
              width: 3,
              shadowColor: this.props.lineColor || "rgba(18,255,255,1)",
              shadowBlur: 10,
            }
          },
          smooth: this.props.smooth,
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
                    color: this.props.areaStart || "rgba(18,255,255,.85)"
                  },
                  {
                    offset: 1,
                    color: this.props.areaEnd || "rgba(18,255,255,0)"
                  }
                ]
              }
            }
          },
          data: me.state.data.data
        }
      ]
    };
    try {
      myChart.setOption(options, true);
    } catch (e) {
      console.log(e);
    }
  };
};
