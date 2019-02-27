import React, { Component } from 'react';
import echarts from "echarts";

const color = ['rgba(67,213,236,1)', 'rgba(1,250,177,1)', 'rgba(237,90,194,1)', 'rgba(239,226,32,1)', 'rgba(226,68,75,1)', 'rgba(0,115,254,1)', 'rgba(4,92,158,1)', 'rgba(0,172,247,1)', 'rgba(46,221,241,1)'];

class Page extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = { data: [] };
  };

  _setData(d) {
    let me = this;
    me.lock = true;
    me.setState({
      data: d,
    })
  };

  appear() { }

  disappear() { }

  dealData(arr) {
    let list = arr.sort((a, b) => { return a.value < b.value });
    return list;
  }

  componentDidMount() {
    let me = this;
    let data = me.dealData(me.state.data);
    me.chart = echarts.init(this.refs.pie);
    me.option = {
      color: color,
      series: [
        {
          name: '分布情况',
          type: 'pie',
          radius: ['30%', '45%'],
          labelLine: {
            length2: 50
          },

          data: data,
          label: {
            normal: {
              color: '#acfbf8',
              fontSize: 18,
              formatter: '{b}\n{d}%',
            },
            emphasis: {
              fontSize: 22
            }
          }
        },
        {
          name: '分布情况',
          type: 'pie',
          radius: ['30%', '45%'],
          data: data,
          avoidLabelOverlap: false,
          itemStyle: {
            borderWidth: 3,
            borderColor: '#08367a'
          },
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '{d}%',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: 20,
                fontWeight: 'bold'
              }
            }
          },
        }
      ]
    }
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return };
    me.lock = false;

    let data = me.dealData(me.state.data);

    me.option.series[0].data = data;
    me.option.series[1].data = data;
    me.chart.setOption(me.option, true);
  };

  render() {
    let me = this;
    return (
      <div style={{
        width: me.props.width,
        height: me.props.height,
        position: 'relative',
      }}>
        <div ref={'pie'} style={{
          width: me.props.width,
          height: me.props.height,
          position: 'absolute'
        }}></div>
      </div>

    );
  }
};

export default Page;
