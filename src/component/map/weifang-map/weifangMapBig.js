import React, { Component } from 'react';
import echarts from 'echarts';
import mapJson from './370700-weifang.json';

class WeifangMap extends Component {

  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      data: [
        { name: '寿光', value: 18163, money: 300, stopReceiving: 100, label: { normal: { show: true } } },
        { name: '青州', value: 16163, money: 400, stopReceiving: 200, label: { normal: { show: true } } },
        { name: '临朐', value: 14163, money: 500, stopReceiving: 300, label: { normal: { show: true } } },
        { name: '诸城', value: 11163, money: 600, stopReceiving: 400, label: { normal: { show: true } } },
        { name: '安丘', value: 8163, money: 700, stopReceiving: 500, label: { normal: { show: true } } },
        { name: '昌乐', value: 9163, money: 800, stopReceiving: 600, label: { normal: { show: true } } },
        { name: '潍城', value: 7163, money: 900, stopReceiving: 700, label: { normal: { show: true } } },
        { name: '奎文', value: 6163, money: 100, stopReceiving: 800, label: { normal: { show: true } } },
        { name: '寒亭', value: 5163, money: 200, stopReceiving: 900, label: { normal: { show: true } } },
        { name: '昌邑', value: 4163, money: 400, stopReceiving: 100, label: { normal: { show: true } } },
        { name: '坊子', value: 3163, money: 200, stopReceiving: 300, label: { normal: { show: true } } },
        { name: '高密', value: 2163, money: 800, stopReceiving: 700, label: { normal: { show: true } } }
      ]
    };
  }

  setData(d) {
    let me = this;
    me._flag = true;
    me.setState({
      data: d
    });
  }

  componentDidUpdate() {
    const me = this;
    if (!me._flag) { return };
    if (!me.state.data) { return };
    me.option.series[0].data = me.state.data;
    me.option.visualMap.max = Math.max.apply(null, me.state.data.map((t) => { return t.value }));
    me.option.tooltip.formatter = function (params) {
      if (params.data) {
        return '<span style="color:#ffeb3b">' + params.name + '</span>' + '</br>' + '本月登记失业人数：' + params.value + '</br>' + '本月发放失业金人数：' + params.data.money + '</br>' + '本月停止领取人数：' + params.data.stopReceiving

      } else {
        return null
      }
    }
    me._echartsInstance.setOption(me.option)
  }

  componentDidMount() {
    let me = this;
    me._echartsInstance = echarts.init(me.refs.mapRef);
    echarts.registerMap('weifang', mapJson);
    me.option = {
      tooltip: {
        show: true,

      },
      visualMap: {
        min: 0,
        max: 25000,
        itemWidth: '16',
        itemHeight: '70',
        left: '154px',
        top: '240px',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: false,
        inRange: {
          color: ['rgba(0,247,251,.5)', 'rgba(1,71,173,.5)']
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: [
        {
          show: true,
          roam: false,
          top: '21%',
          map: 'weifang',
          aspectScale: 0.9,
          label: {
            normal: {
              show: false,
              color: '#000',
              fontSize: 14
            },
            emphasis: {
              show: false,
              color: '#000',
              fontSize: 14
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(8,112,137,.8)',
              borderColor: 'rgba(8,112,137,.8)'
              // areaColor: 'rgba(1,251,255,.2)',
              // borderColor: 'rgba(6,88,155,0)',
              // borderWidth: 14
            }
          },
          silent: true
        }
      ],
      series: [
        {
          type: 'map',
          mapType: 'weifang',
          aspectScale: 0.9,
          top: '20%',
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#41fcff',
              areaColor: 'rgba(0,247,251,.5)',
            },
            emphasis: {
              borderWidth: 1,
              areaColor: '#389BB7',
              borderColor: '#41fcff',
              borderWidth: 0
            }
          },
          animation: false,
          data: me.state.data
        }
      ]
    }
    me._echartsInstance.setOption(me.option)
  }
  render() {
    let me = this;
    return (
      <div ref='mapRef' style={{ width: me.props.width, height: me.props.height, position: 'absolute', left: me.props.left || 0, top: me.props.top || 0 }}>
      </div>
    );
  }
}

export default WeifangMap;
