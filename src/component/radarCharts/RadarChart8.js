/**
 * 柱状图
 *
 * author   zdd
 */
import React, { Component } from 'react';
import echarts from "echarts";

class HistogramBar extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this.state = {};
    me._flag = false;
  };
  _option = undefined;

  _setData(d) {
    this._flag = true;
    this.setState({
      data: d
    });
  }

  render() {
    return (
      <div ref={'barBox'} style={this.props.style}></div>
    )
  }
  componentDidUpdate() {
    let me = this;
    let barBox = me.refs.barBox;
    me.charts = echarts.init(barBox);
    if (me._flag) {
      me.initData = {
        xAxisData: this.state.data.xAxisData,
        seriesData: this.state.data.seriesData,
        subtext: this.state.data.subtext,
        dataZooms: this.state.data.dataZoom,
        times: this.state.data.times,
        endData: this.state.data.endData
      };
      me._option = {
        title: {
          subtext: me.initData.subtext || " ",
          subtextStyle: {
            color: "#12ffff",
            fontSize: 17,
          }
        },
        tooltip: {
          // formatter:'{a}<br />{b0}:{c0}亿',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#1f8cbd'],
        grid: {
          left: '2%',
          right: '3%',
          bottom: '0%',
          top: '25%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: me.initData.xAxisData || null,
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#10dee2',
              fontSize: 18,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#0259c4"
              },
              symbol: ['none', 'arrow'],
              symbolSize: [5, 8]
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#10dee2',
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                color: "#0259c4"
              },
              symbol: ['none', 'arrow'],
              symbolSize: [5, 8]
            },
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#04499b'],
                type: 'dashed'
              }
            },
            splitNumber: 4
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 50 || me.initData.endData
          }
        ],
        series: [
          {
            name: '指数',
            type: 'bar',
            // barGap: '0',
            barWidth: 23,
            data: me.initData.seriesData,
            itemStyle: {
              normal: {
                borderWidth: '2',
                borderColor: 'aqua',
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2abfff' },
                    { offset: 1, color: '#0c2359' }
                  ]
                )
              },
              emphasis: {
                borderWidth: '2',
                borderColor: '#fdbf35',
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#f92e30' },
                    { offset: 1, color: '#0b1f5e' }
                  ]
                )
              }
            },
          }
        ]
      };

      let time = null;
      let timer;
      let a = 10, b = a + 50;
      // console.log(me.initData.seriesData)
      //柱状图轮播
      let arr = []
      let flags;
      function lunbo() {
        a += 10; b += 10
        if (b == 100) {
          a = 0
          b = 50
        }
        me.charts.dispatchAction({
          type: 'dataZoom',
          batch: [{
            // 第一个 dataZoom 组件
            start: a,
            end: b
          }]
        })
      }
      //开启定时器
      time = setInterval(lunbo, 1000)
      if (me.initData.times == false) {
        clearInterval(time)
      }
      //鼠标滑过清定时器
      me.charts.on("mouseover", function () {
        timer = time;
        clearInterval(time)
      })
      //鼠标离开开定时器
      me.charts.on("mouseout", function () {
        if (time > timer) {
          return;
        }
        if (!me.initData.times) {
          return;
        }
        time = setInterval(lunbo, 1000)
      })
      me.charts.setOption(me._option);
    }

    me._flag = false;
  }
}


export default HistogramBar;
