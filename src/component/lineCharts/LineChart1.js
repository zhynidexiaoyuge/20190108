import React from 'react';
import echarts from 'echarts';
import bgs from './img/bg.png';
class Line extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 'year'
    }
  };

  _setData(d) {
    const me = this;
    me.flag = true;
    me.setState({
      data: d
    })
  }
  //年度季度切换
  changeSeason(d) {
    this.setState({
      activeIndex: d
    })
  }
  render() {
    const me = this;
    const props = me.props;
    return (
        <div style={{
          position: 'absolute',
          width: props.width,
          height: props.height,
          left: props.left,
          top: props.top
        }}>
          {/* <a className={me.state.activeIndex == 'year' ? 'changeYear changeSeasonActive' : 'changeYear'} onClick={me.changeSeason.bind(this, 'year')}>年度</a>
          <a className={me.state.activeIndex == 'season' ? 'changeSeason changeSeasonActive' : 'changeSeason'} onClick={me.changeSeason.bind(this, 'season')}>季度</a> */}
          <div ref={'lineChart'} style={{
            width: props.width,
            height: props.height,
          }}>
          </div>
      </div>
    )
  };

  componentDidMount() {
    const me = this;
    const ref = me.refs;
    me.lineChart = echarts.init(ref.lineChart);
    me._option = {
      title: {
        text: '单位:万人',
        right:20,
        top:20,
        textStyle:{
          color:'#fff',
          fontSize:16,
          fontWeight:'nomal'
        }
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        top:20,
        textStyle:{
          color:'#fff'
        },
        data:['新就业人数','总就业人数']
      },
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: this.props.gridTop || '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: [0.01, 0.01],
        boundaryGap:false,
        axisLabel: {
          show: true,
          color: '#fff'
        },
        axisTick: {
          show: true
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#0a89ff'
          }
        },
        data: []
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle:{
            color:'#fff'
          }
        },
        splitArea:{
          show:true,
          areaStyle:{
            color:['rgba(15,71,147,.3)','rgba(200,200,200,0)']
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#226fc3'
          }
        }
      },
      series: [
        {
          name: '新就业人数',
          type: 'line',
          symbolSize: 0,
          smooth:true,
          data: [],
          itemStyle: {
            normal: {
              color: '#00ffb4'
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#00ffb4' // 0% 处的颜色
              }, {
                offset: 1, color: 'transparent' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        },
        {
          name: '总就业人数',
          type: 'line',
          symbolSize: 0,
          smooth:true,
          data: [],
          itemStyle: {
            normal: {
              color: '#00f5ff'
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#02d3e3' // 0% 处的颜色
              }, {
                offset: 1, color: 'transparent' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        },
      ]
    }
    me.lineChart.setOption(me._option)
  };

  componentDidUpdate() {
    const me = this;
    if (!me.flag) {
      return
    }
    if (!me.state.data) {
      return
    }
    me._option.xAxis.data = me.state.data.xAxis;
    me._option.series[0].data = me.state.data.series2;
    me._option.series[1].data = me.state.data.series1;
    me.lineChart.setOption(me._option)

  }

  componentWillUnmount() {
    const me = this;
    if (me.lineChart) {
      me.lineChart.dispose()
    }
  }
}

export default Line;
