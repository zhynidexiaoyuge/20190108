import React, { Component } from 'react';
import echarts from "echarts";

class Page extends Component {
  constructor() {
    super();
    this.state = {};
  }

  _setData(d) {
    this.lock = true;
    this.setState({
      data: d
    });
  }

  componentDidMount() {
    const me = this;
    me.echart = echarts.init(me.refs.barRef);
    me.option = {
      title: {
        text: '单位:万人',
        right: 20,
        top: 20,
        textStyle: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'nomal'
        }
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          return params.name + '</br>' + params.seriesName + ':' + Math.abs(params.value)
        }
      },
      // legend: {
      //   textStyle: {
      //     color: '#fff'
      //   },
      //   itemWidth: 20,
      //   itemHeight: 6,
      //   top: 10,
      //   data: ['就业分行业类型分析']
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          axisLabel: {
            formatter: function (d) {
              if (d < 0) {
                return -d
              } else {
                return d
              }
            },
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#0a89ff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#0955b1'
            }
          },
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#226fc3'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(15,71,147,.3)', 'rgba(200,200,200,0)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0a89ff'
            }
          },
          // data : ['农业','林业','制造业','服务业','建筑业','重工业','化工业']
          data: []
        }
      ],
      series: [
        {
          name: '就业分行业类型分析',
          type: 'bar',
          barWidth: 14,
          stack: '总量',
          data: [120, 132, 101, 134, 190, 230, 210],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 1,
              color: 'rgba(24,120,254,1)'
            }, {
              offset: 0,
              color: 'rgba(24,120,254,.1)'
            }]),
            borderColor: 'rgba(24,120,254,1)',
          }
        }
      ]
    };
  }

  componentDidUpdate() {
    if (this.lock) { this.lock = false } else { return; }
    let me = this;
    me.option.yAxis[0].data = me.state.data.map((t) => { return t.name })
    me.option.series[0].data = me.state.data.map((t) => { return t.value })
    me.echart.setOption(me.option, true);
  }

  render() {
    return (
      <div style={{
        width: this.props.width,
        height: this.props.height,
      }} ref={'barRef'}></div>
    )
  }
}

export default Page;
