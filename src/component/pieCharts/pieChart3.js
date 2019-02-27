/**
 * 标准仓房仓容情况
 * */
import React, { Component } from 'react';
import echarts from 'echarts';

/**
 *
 * description:echart饼图
 * */

class MatterProportion extends Component {
  constructor() {
    super();
    this.state = {};
  }
  _setData(d) {
    let me = this;
    me.lock = true;
    me.setState({
      data: d
    })
  }
  /**点击黑色名单 */
  _ClickBlackName(name) {

  }
  _ClickRedName(name) {

  }
  render() {
    let me = this;
    return (
      <div >
        <div ref={'pieChart'} style={{
          width: this.props.width,
          height: this.props.height,
          position: 'absolute',
          left: this.props.left,
          top: this.props.top
        }}></div>
      </div>
    )
  }
  componentDidMount() {
    let me = this;
    me.charts = echarts.init(me.refs.pieChart);
    me.dataStyle = {
      normal: {
        label: { show: false },
        labelLine: { show: false },
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.5)',
      }
    };
    me.placeHolderStyle = {
      normal: {
        color: 'rgba(0,0,0,0)',
        label: { show: false },
        labelLine: { show: false },
        position: 'left'
      },
      emphasis: {
        color: 'rgba(0,0,0,0)'
      }
    };
    me.option = {
      // backgroundColor: '#071b46',
      color: ["#42fdf1", "#0dd6ff", "#1aa1ff", "#1b66ff", "#4546ff"],
      tooltip: {
        show: true,
        formatter: "{a}{b}<br />数据量 : {c}条 <br />占比：{d}%",
        borderColor: '#fff',
        backgroundColor: '#077fad',
        textStyle: {
          fontSize: 24
        }
      },
      legend: {
        itemGap: 20,
        orient: 'vertical',
        left: me.props.location || '60%',
        top: me.props.legendTop || '10%',
        data: [],
        textStyle: {
          color: '#40bbd6',
          fontSize: 24
        }
      },
      series: []
    };
    me.charts.setOption(me.option)
  }
  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return };
    me.lock = false;
    if (!me.state.data) return;
    let datas = me.state.data;
    let legendData = []
    let seriesData = [];
    let arr = [];
    datas.map((p, i) => {
      arr.push(p.showvalue);
    });
    let num = 0;
    arr.map((p, i) => {
      num += p;
    });
    let minData = Math.min.apply(null, arr)
    datas.map((s, i) => {
      legendData.push(s.name);
      seriesData.push({
        name: '',
        type: 'pie',
        minAngle: 45,
        clockWise: true,
        radius: [100 - 10 * (i + 1) - 10 * i, 100 - 10 * i - 10 * i],
        center: me.props.position || ['30%', '50%'],
        itemStyle: me.dataStyle,
        hoverAnimation: false,
        data: [
          {
            value: s.showvalue,
            name: s.name,
          },
          {
            value: num - s.showvalue,
            name: '',
            itemStyle: me.placeHolderStyle
          }
        ]
      })
    })
    me.option.legend.data = legendData;
    me.option.series = seriesData;

    me.charts.setOption(me.option);
  }
  componentWillUnmount() {
    if (!this.charts) { return }
    this.charts.dispose();
  }
}
export default MatterProportion;
