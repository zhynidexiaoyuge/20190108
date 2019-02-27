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
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          return params.name + '</br>' + params.seriesName + ':' + Math.abs(params.value)
        }
      },
      legend: {
        textStyle: {
          color: '#fff'
        },
        itemWidth: 20,
        itemHeight: 6,
        top: 10,
        data: ['人才需求', '人才供给', '现有人才']
      },
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
          axisLine: {
            lineStyle: {
              color: '#0a89ff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#044595",
              type: "dashed",
              opacity: ".6"
            }
          },
          // data : ['通讯业','餐饮业','娱乐业','房地产业','制造业','建筑业','批发和零售']
          data: []
        }
      ],
      series: [
        {
          name: '人才供给',
          type: 'bar',
          // data:[200, 170, 240, 244, 200, 220, 210],
          data: [],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(241,255,88,1)'
            }, {
              offset: 1,
              color: 'rgba(241,255,88,.1)'
            }]),
            borderColor: 'rgba(241,255,88,1)',
          }
        },
        {
          name: '人才需求',
          type: 'bar',
          stack: '总量',
          // data:[320, 302, 341, 374, 390, 450, 420],
          data: [],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(0,253,254,1)'
            }, {
              offset: 1,
              color: 'rgba(0,253,254,.1)'
            }]),
            borderColor: 'rgba(0,253,254,.1)',
          }
        },
        {
          name: '现有人才',
          type: 'bar',
          stack: '总量',
          // data:[-120, -132, -101, -134, -190, -230, -210],
          data: [],
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
    // me.echart.setOption(me.option, true);
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return }
    if (!me.state.data) { return }
    me.option.yAxis[0].data = me.state.data.nameList
    me.option.series[1].data = me.state.data.valueList[0] || [];
    me.option.series[0].data = me.state.data.valueList[1] || [];
    me.option.series[2].data = me.state.data.valueList[2].map((t) => { return -t })
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
  componentWillUnmount() {
    const me = this;
    if (me.echart) {
      me.echart.dispose()
    }
  }
}

export default Page;
