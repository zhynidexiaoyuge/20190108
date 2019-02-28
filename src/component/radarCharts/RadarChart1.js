import React from 'react';
import echarts from 'echarts';

class RadarChart extends React.Component {
  constructor(props) {
    super(props)
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
      <div>
        <div ref={'radarChart'} style={{
          width: this.props.width,
          height: this.props.height,
          position: 'absolute',
          left: this.props.left,
          top: this.props.top
        }}></div>
      </div >
    )
  }
  shouldComponentUpdate(nextprops, nextState) {
    if(!this.flag){ return false;}
    let me = this;
    const data = nextState.data;
    if (this.state.data && this.state.data == data) {
      return false;
    } else {
      let max = Math.max(...data.data)
      data.name.map((s, i) => {
        me.option.radar.indicator.push({
          name: s,
          max: max
        })
      })
      me.option.series[0].data[0].value = data.data;
      me.radarCharts.setOption(me.option, true);
      return false;
    }
    this.flag = false;
  }

  componentDidMount() {
    let me = this;
    me.radarCharts = echarts.init(me.refs.radarChart);
    me.option = {
      tooltip: {
        tigger: 'axis'
      },
      radar: {
        radius: '70%',
        splitNumber: this.props.num || 4,
        symbol: 'circle',
        symbolSize: 10,
        axisLine: { // 坐标轴线
          show: true, // 默认显示，属性show控制显示与否
          lineStyle: {
            color: '#1c92e4'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: '#0d5aba' // 图表背景网格线的颜色
          }
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(127,95,132,.3)',
            opacity: 0,
          }
        },
        name: {
          formatter: '{value}',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        indicator: [
        ]
      },
      series: [{
        name: '',
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          normal: {
            opacity: 0.8
          }
        },
        data: [{
          value: [],
          name: ''
        }]
      }],
      color: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [{
          offset: 1, color: 'rgba(13,247,247,.5)' // 0% 处的颜色
        }, {
          offset: 0, color: 'rgba(13,247,247,.2)' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      }
    };
  }
  componentWillUnmount() {
    let me = this;
    if (me.radarCharts) {
      me.radarCharts.dispose()
    }
  }
}
export default RadarChart;
