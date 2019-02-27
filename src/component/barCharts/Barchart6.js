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
      grid: {
        top: '6%',
        bottom: '6%',
        right: '8%',
        left: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLabel: {
            show: false,
            interval: 1,
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }

        }
      ],
      yAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          color: "rgba(255,255,255,1)",
          formatter: function (value) {
            return value
          },
          rich: {
          },
          fontSize: 16
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        zlevel: 99
      },
      series: [
        {
          type: 'bar',
          barWidth: '26',
          barGap: '-100%',
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 10, 10],
              color: 'rgba(27,78,154,.7)',
              label: {
                show: false,
              }
            }
          },
          data: []
        },
        {
          type: 'bar',
          barWidth: '26',
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 10, 10],
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  { offset: 1, color: '#0eacaf' },
                  { offset: 0, color: '#01feb3' }
                ]
              ),
              label: {
                show: false,
                position: 'insideRight',
                textStyle: {
                  color: '#fff',
                  fontSize: '14'
                }
              }
            }
          },
          data: []
        }]
    };
    me.echart.setOption(me.option, true);
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return }
    if (!me.state.data) { return }
    let maxData = [];
    this.state.data.seriesData.forEach(function (t, i) {
      maxData.push(Math.max.apply(null, me.state.data.seriesData))
    })
    me.option.series[0].data = maxData;
    me.option.yAxis.data = me.state.data.seriesName;
    me.option.series[1].data = me.state.data.seriesData;
    me.echart.setOption(me.option, true);
  }
  _addList() {
    let me = this;
    me.seriesData = [];
    if (!me.state.data) { return };
    me.state.data.seriesData.map((s, i) => {
      me.seriesData.push(s)
    })
    return me.seriesData.reverse().map((t, i) => {
      return <li key={'zhy' + i} style={{ height: 46, color: '#01feb3', fontSize: 14, textAlign: 'right',listStyle:'none' }}>{t}</li>
    })
  }
  render() {
    let me = this;

    return (
      <div style={{
        position: 'absolute',
        width: this.props.width,
        height: this.props.height,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: this.props.left,
          width: this.props.width,
          height: this.props.height,
        }} ref={'barRef'}></div>
        <ul style={{
          position: 'absolute',
          top: 23,
          right: 20,
          width: this.props.width,
          height: this.props.height,
          zIndex: 10,
        }}>
          {this._addList()}
        </ul>
      </div>
    )
  }
}

export default Page;
