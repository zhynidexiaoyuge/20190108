import React, { Component } from 'react';
import echarts from 'echarts';
import mapJson from './370700-weifang.json';

class WeifangMap extends Component {

  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      // data: [
      //   { name: '寿光', value: 18163, label: { normal: { show: true } } },
      //   { name: '青州', value: 16163, label: { normal: { show: true } } },
      //   { name: '临朐', value: 14163, label: { normal: { show: true } } },
      //   { name: '诸城', value: 11163, label: { normal: { show: true } } },
      //   { name: '安丘', value: 8163, label: { normal: { show: true } } },
      //   { name: '昌乐', value: 9163, label: { normal: { show: true } } },
      //   { name: '潍城', value: 7163, label: { normal: { show: true } } },
      //   { name: '奎文', value: 6163, label: { normal: { show: true } } },
      //   { name: '寒亭', value: 5163, label: { normal: { show: true } } },
      //   { name: '昌邑', value: 4163, label: { normal: { show: true } } },
      //   { name: '坊子', value: 3163, label: { normal: { show: true } } },
      //   { name: '高密', value: 2163, label: { normal: { show: true } } }
      // ]
    };
  }

  _setData(d) {
    let me = this;
    me._flag = true;
    me.setState({
      data: d
    });
  }

  componentDidUpdate() {
    let me = this;
    if (!me._flag) { return false }
    me.option.series[0].data = me.state.data;
    me.option.visualMap.max = Math.max.apply(null, me.state.data.map((t) => { return t.value }))
    me._echartsInstance.setOption(me.option)
    me._flag = false;
  }

  componentDidMount() {
    let me = this;
    me._echartsInstance = echarts.init(me.refs.mapRef);
    echarts.registerMap('weifang', mapJson);
    me.option = {
      visualMap: {
        min: 0,
        max: 500,
        itemWidth: '6',
        itemHeight: '60',
        left: '10',
        top: '56%',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        inRange: {
          color: ['#00f7fb', '#072862']
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: [
        {
          show: true,
          roam: false,
          top: '13%',
          map: 'weifang',
          aspectScale: 1.2,
          label: {
            normal: {
              show: false,
              color: '#000',
              fontSize: 12
            },
            emphasis: {
              show: false,
              color: '#000',
              fontSize: 12
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(1,251,255,.2)',
              borderColor: 'rgba(6,88,155,0)',
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
          aspectScale: 1.2,
          top: '11%',
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#12ffff',
              areaColor: '#rgba(8,112,137,.8)',
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          },
          animation: false,
          data: me.state.data
        }
      ]
    }
    // me._echartsInstance.setOption(me.option)
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
