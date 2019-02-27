import React from 'react';
import echarts from 'echarts';
class Line extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  };
  _setData(d) {
    const me = this;
    me.flag = true;
    me.setState({
      data: d
    })
  }
  render() {
    const me = this;
    const props = me.props;
    return (
      <div ref={'lineChart'} style={{
        width: props.width,
        height: props.height,
        position: 'absolute',
        left: props.left,
        top: props.top
      }}></div>
    )
  };
  componentDidMount() {
    const me = this;
    const ref = me.refs;
    me.lineChart = echarts.init(ref.lineChart);
    me._option = {
      tooltip: {
        backgroundColor: 'rgba(12,24,73,0.2)',
        formatter: '{c}',
        textStyle: {
          fontSize: 16
        }
      },
      grid: {
        left: '6%',
        right: '0%',
        bottom: '0%',
        top: this.props.gridTop || '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: [0, 0.01],
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
        data: [],
        axisLabel: {
          show: false
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
          name: '2012年',
          type: 'line',
          symbol: 'emptyCircle',
          symbolSize: 8,
          data: [],
          itemStyle: {
            normal: {
              color: '#00f5ff'
            }
          }
        }
      ]
    }
    me.lineChart.setOption(me._option)
  };
  componentDidUpdate() {
    const me = this;
    if (!me.flag) {
      return
    };
    if (!me.state.data) { return };
    me._option.xAxis.data = me.state.data.xData;
    me._option.series[0].data = me.state.data.seriesData;
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