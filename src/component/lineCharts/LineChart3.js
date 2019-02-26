import React, { Component } from 'react';
import echarts from 'echarts';
/*折线图组件 */
class CityCreditRating extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };
  _setData(d) {
    let me = this;
    me.lock = true;
    me.setState({
      data: d
    })
  };
  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return }
    //me.lock = false;
    if(me.lock){
      me.option.xAxis.data=me.state.data.Xdata;
      me.option.series[0].data=me.state.data.SeriesData;
      me.charts.setOption(me.option)
    }
  };
  componentDidMount() {
    let me = this;
    me.charts = echarts.init(me.refs.line);
    me.option = {
      grid: {
        top: '10%',
        left: '15%',
        right: '8%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#458cbf'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#0875d4'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: '#02113a',
            opacity: 0.5
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#4ce3ff',
          fontSize: 18,
          rotate: '-30'
        }
      },
      yAxis: {
        type: 'value',
        inverse: true,
        max: 25,
        min: 5,
        minInterval: 5,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#458cbf'
          }
        },
        axisLabel: {
          show: true,
          color: '#4ce3ff',
          fontSize: 18,
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },

      },
      series: [
        {
          name: '邮件营销1',
          type: 'line',
          symbol: 'circle',
          symbolSize: 9,
          itemStyle: {
            normal: {
              color: '#1767bc',
              borderColor: '#fff',  //拐点边框颜色
              label: {
                show: true,
                color: '#4ce3ff',
                fontSize: 24
              }
            }
          },
          data: []
        },
      ]
    }
  };
  render() {
    let me = this;
    return (
      <div >
        <div ref={'line'} style={{
          width: me.props.width,
          height: me.props.height,
          position: "absolute"
        }}></div>
      </div>
    )

  };
  componentWillUnmount() {
    if (this.charts) { this.charts.dispose(); }
  };
};
export default CityCreditRating;
