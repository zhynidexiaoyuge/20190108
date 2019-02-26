import React from 'react';
import echarts from 'echarts';
import icon1 from './img/series1.png';
import icon2 from './img/series2.png';
import icon3 from './img/series3.png'
import icon4 from './img/series4.png'
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };
  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }
  render() {
    return (
      <div ref={'lineChart'} style={{
        position: 'absolute',
        left: this.props.left,
        top: this.props.top,
        width: this.props.width,
        height: this.props.height
      }}></div>
    )
  }
  componentDidMount() {
    const me = this;
    me.lineChart = echarts.init(me.refs.lineChart);
    me._option = {
      title: {
        text: this.props.text || '价格(元)',
        x: 20,
        y: 22,
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0a1f52',
        borderColor: '#12ffff',
        borderWidth: 1
      },
      legend: {
        icon: 'rect',
        top: 20,
        right: this.props.right || 30,
        itemWidth: 24,
        itemHeight: 2,
        itemGap: 10,
        data: [],
        textStyle: {
          fontSize: 16,
          color: '#fff'
        }
      },
      grid: {
        left: '6%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        interval: 0,
        axisLabel: {
          show: true,
          color: '#00ffe4',
          fontSize: 14
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#0a89ff'
          }
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
          color: '#00ffe4'
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#0a89ff'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#0875d4'
          }
        },
        axisLine: {
          show: false
        },
      },
      series: [
        {
          name: '指标1',
          type: 'line',
          stack: '总量',
          color: ['#3bffd0'],
          symbol: `image://${icon1}`,
          smooth: true,
          symbolSize: 12,
          showSymbol: false,
          data: []
        },
        {
          name: '指标2',
          type: 'line',
          stack: '总量',
          color: ['#fefa92'],
          symbol: `image://${icon2}`,
          smooth: true,
          symbolSize: 12,
          showSymbol: false,
          data: []
        },
        {
          name: '指标3',
          type: 'line',
          stack: '总量',
          color: ['#ff5384'],
          symbol: `image://${icon3}`,
          smooth: true,
          symbolSize: 12,
          showSymbol: false,
          data: []
        },
        {
          name: '指标4',
          type: 'line',
          stack: '总量',
          color: ['#00bbff'],
          symbol: `image://${icon4}`,
          smooth: true,
          symbolSize: 12,
          showSymbol: false,
          data: []
        }
      ]
    }
    me.lineChart.setOption(me._option);
  }
  componentDidUpdate() {
    const me = this;
    if (!me.flag) { return }
    if (!me.state.data) { return };
    for (let i = 0; i < me.state.data.legend.length; i++) {
      me._option.series[i].name = me.state.data.legend[i]
    }
    me._option.legend.data = me.state.data.legend;
    me._option.xAxis.data = me.state.data.xData;
    me._option.series[0].data = me.state.data.seriesData1;
    me._option.series[1].data = me.state.data.seriesData2;
    me._option.series[2].data = me.state.data.seriesData3;
    me._option.series[3].data = me.state.data.seriesData4;
    me.lineChart.setOption(me._option);
  }
  componentWillUnmount() {
    if (this.lineChart) {
      this.lineChart.dispose()
    }
  }
}
export default Line;