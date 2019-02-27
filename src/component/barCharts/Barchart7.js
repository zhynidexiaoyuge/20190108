import React from 'react';
import echarts from 'echarts';

class SingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }
  render() {
    return (
      <div style={{
        fontSize: 14,
        color: '#fff'
      }}>
        <div ref={'singBar'} style={{
          width: this.props.width,
          height: this.props.height,
          position: 'absolute',
          left: this.props.left,
          top: this.props.top
        }}></div>
        <span style={{
          position: 'absolute',
          left: 31,
          top: this.props.conTop || - 31
        }}>{this.props.content}</span>
        <span style={{
          position: 'absolute',
          left: 620,
          top: this.props.lineTop || -38,
          fontSize: 12
        }}>平均需求线</span >
      </div >
    )
  }
  componentDidUpdate() {
    const me = this;
    if (!me.flag) { return }
    if (!me.state.data) { return };
    me._option.xAxis[0].data = me.state.data.xData;
    let maxData = [];
    me.state.data.series1.forEach(function (t, i) {
      maxData.push(Math.max(...me.state.data.series1))
    })
    me._option.series[0].data = maxData;
    let type = me.state.data.type;
    let dataArr = [];
    type.map((s, i) => {
      let obj = {
        types: s,
        val: me.state.data.series1[i]
      }
      dataArr.push(obj)
    })

    me._option.series[1].data = dataArr.map((s, i) => {
      let colorStart = undefined;
      let colorEnd = undefined;
      let borderColor = undefined
      if (s.types == 0) {
        colorStart = 'rgba(0,253,254,1)';
        colorEnd = 'rgba(0,253,254,.1)';
        borderColor = '#00fdfe'
      } else if (s.types == 1) {
        colorStart = 'rgba(242,53,104,1)';
        colorEnd = 'rgba(242,53,104,.1)';
        borderColor = '#f23568'

      } else if (s.types == 2) {
        colorStart = 'rgba(241,255,88,1)';
        colorEnd = 'rgba(241,255,88,.1)';
        borderColor = '#f1ff58'
      }
      return {
        value: s.val,
        itemStyle: {
          barWidth: 2,
          borderColor: borderColor,
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [{
              offset: 0,
              color: colorStart
            },

            {
              offset: 1,
              color: colorEnd
            }
            ]
          )
        },
      }
    })
    me._option.series[2].data = me.state.data.series2;
    me.singBar.setOption(me._option)
  }
  componentDidMount() {
    const me = this;
    me.singBar = echarts.init(me.refs.singBar);
    me._option = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: false,
      grid: {
        top: 0,
        left: 60,
        right: 1,
        bottom: 20
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#0a89ff'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',

          position: 'left',
          axisLine: {
            lineStyle: {
              color: "#0a89ff"
            }
          },
          splitLine: {
            show: false,

          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#0a89ff"
            }
          },
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: { color: 'rgba(10,137,255,.1)' }
          },
          barGap: '-78%',
          barWidth: 27,
          data: [220, 220, 220, 220, 220],
          animation: false,
          tooltip: {
            show: false
          }
        },
        {
          name: '供求量',
          yAxisIndex: 0,
          type: 'bar',
          barWidth: 16,
          itemStyle: {
            barWidth: 2,
            borderColor: '#00fdfe',
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,253,254,1)'
              },

              {
                offset: 1,
                color: 'rgba(0,253,254,.1)'
              }
              ]
            )
          },
          data: []
        },
        { // For shadow
          type: 'line',
          data: [40.5, 60.5, 90.5, 40.5, 180.5],
          symbol: 'none',
          tooltip: {
            show: false
          },
          label: {
            show: false
          },
          lineStyle: {
            color: 'rgba(0,0,0,0)'
          },
          markLine: {
            symbol: 'none',//去掉箭头
            data: [
              {
                type: 'average',
                name: '平均值',
                lineStyle: {
                  type: 'dashed',
                  color: '#0960bc'
                },
                label: {
                  show: false
                },
              }
            ]
          }
        },
      ]
    }
    me.singBar.setOption(me._option)
  }
  componentWillUnmount() {
    if (this.singBar) {
      this.singBar.dispose()
    }
  }
}
export default SingBar;