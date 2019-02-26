import React from 'react';
import echarts from 'echarts';
import items1 from './img/items1.png';
import items2 from './img/items2.png';
class LineCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }
  componentDidUpdate() {
    let me = this;
    if (!me.state.data) return;
    const colors = [
      { startColor: 'rgba(254, 232, 3,0.5)', endColor: 'rgba(254, 232, 3,0.01)', lineColor: '#fee803' },
      { startColor: 'rgba(0,245, 255,0.5)', endColor: 'rgba(0,245, 255,0.01)', lineColor: '#00f5ff' }
    ];
    if (me.props.type == 'flowTrend') {
      me.option.title.text = '单位:GB';
    }
    me.option.legend.data = me.state.data.map((t, i) => { return t.name })
    me.option.xAxis[0].data = me.state.data[0].data.map((t, i) => { return t.dataKey })
    me.option.series = me.state.data.map((t, i) => {
      let item;
      i == 0 ? item = items1 : item = items2
      return {
        name: t.name,
        type: 'line',
        // symbol: 'image://' + item,
        symbol:'circle',
        symbolSize: 14,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: colors[i].startColor
            }, {
              offset: 1,
              color: colors[i].endColor
            }], false)
          }
        },
        lineStyle: {
          color: colors[i].lineColor,
          width: 4,
        },
        data: t.data.map((t, i) => { return t.value })
      }
    })
    me.toiletLineCharts.setOption(me.option)
  }
  componentDidMount() {
    let me = this;
    let circleArr = ['#fee803', '#00f5ff']
    me.toiletLineCharts = echarts.init(me.refs.lineCharts);
    me.option = {
      color:circleArr,
      title: {
        text: `单位:${this.props.title} ` || '单位:GB',
        top: 0,
        textStyle: {
          color: '#c5fdff',
          fontSize: 20,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor:'rgba(25,31,106,0.8)',
        formatter:function (params) {
          let res='<div style="min-width:10px;font-size: 14px;line-height: 22px">' + '<h2 style="margin-bottom:0;color:#fff;font-size: 18px;line-height: 30px">'+params[0].name+'</h2>';
          if(params.length > 0){
            for(let i=0;i<params.length;i++){
              res += '<span style="margin-right:7px;background: '+circleArr[i]+';display: inline-block;width:10px;height:10px;border-radius: 10px"></span>'+'</span><span>'+params[i].seriesName+': </span>'+ '<br/>';
            }
          }else{
            res += '- null'
          }
          return res;
        }
      },
      grid: {
        left: '0%',
        top: '12%',
        right: '0%',
        containLabel: true
      },
      legend: {
        selectedMode: true,
        itemGap: 50,
        textStyle: {
          color: '#fff',
          fontSize: 20,
          fontWeight: 'normal'
        },
        right: 48,
        data: []
      },
      dataZoom: this.props.dataZoom || [{
        start: 30,
        end: 100
      }, {
        type: 'slider',
        show: true,
        backgroundColor: '#0f2981',
        borderColor: '#0f2981',
        fillerColor: 'rgba(8,212,249,.3)',
        handleStyle: {
          color: '#61e7ff'
        },
        dataBackground: {
          lineStyle: {
            color: '#368ec0'
          },
          areaStyle: {
            color: '#368ec0'
          }
        }
      }],
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: [],
          axisLabel: {
            show: true,
            fontSize: 20,
            color: '#c5fdff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: '#00ffee',
              type: 'solid'
            }
          },

        }
      ],
      yAxis: {
        type: 'value',
        axisLine: {
          symbolOffset: 14,
          symbol: ['none', 'arrow'],
          lineStyle: {
            color: '#00ffee',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          fontSize: 20,
          color: '#c5fdff'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#0a5b71'
          }
        }
      }
      ,
      series: []
    }

  }
  render() {
    let me = this;
    return (
      <div ref='lineCharts' style={{
        width: me.props.width,
        height: me.props.height,
        position: 'absolute',
        top: me.props.top || 0,
        left: me.props.left || 0
      }}></div>
    )
  }
  componentWillUnmount() {
    this.toiletLineCharts.dispose()
  }
}
export default LineCharts;
