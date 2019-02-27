import React, { Component } from 'react';
import echarts from "echarts";

const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACRElEQVQ4ja2Uv2sTYRjHP+/lLuk1MYm2UhoRg20Hq4NdiuCSoeDULR3EzTrZoZuLCEIm/wCd7OrSbIGCkMHFpUugxIK0glBoWlDrNb1ekzfpObzPpVfi4OADX17ued/ne89vhR8SEwVYgoRAyV0I9AXngoGxHSOx5DsJjACjcjpyr4Ez4FTOLtATwgGRJQajQBa4BowBedEhBL+Bn8Av4Fh0Gji3xXVbDK4CBaAomARyQuQBLeC7YF/0PqBt8SYpnhSAWWDOrTdLbq0x5ewcOgB6ZkIHi3O7wcK9TzEv++JRPyIakXCKwP0rb+vldHVzPJY/klt7TnJr74799eB6e2VBSVi+oBNVZ1RyUnTrzVK6ujnuOFBZTbG9kWF7I0NlNYXjQLq6Oe7WmyX56ZjYJiKiEUnspFtrTAO8ep5ieSlJPqvIZxXLS0lePEsB4NYaU5K/vNgmLEl2VLGcs2tyUn4UVf1CniwanbzJiY0DKGvo9b9IOKyyRK0leZ6entAA1Y966PGHmtHpmQmNaYeoj0ILU8IzTLO1gsW5bwCVdx3W1rt47RCvHbK23uXN+w4A8qYlNmdAX+GHUbw3gbvAw7+VPxK/PP+jvbJQBT4DX4A9wEvw8rXCJFxJmP3u/O2jfiGfsY6DnOUFCewEevaGPnla2vEfP9gAGsAOcAi0Aa3ww6hqaUxTFoBbmD4pcHlE9rkYkRZm5gYjEmKm+FQMesAJcICZPVf0AXDE8ND2gFDF9lF8jbgxRBuiJ2QRLq0R9b8W2x8Nqs4gHR+vHQAAAABJRU5ErkJggg=='

class Page extends Component {
  constructor() {
    super();
    this.state = {};
  }

  _setData(d) {
    this.lock = true;
    this.setState({
      data: d
    });
  }

  componentDidMount() {
    const me = this;
    me.echart = echarts.init(me.refs.barRef);
    me.option = {
      tooltip: {
        trigger: 'item',
        borderWidth:1,
        borderColor:'#12ffff',
        axisPointer: {
          type: 'none',
        },
        textStyle: {
          fontSize: 20,
          color:'#fff'
        },
        // position: function (point, params, dom, rect, size) {
        //   return [rect.x + 50, rect.y - 34];
        // },
        formatter: s => {
          let yname = me.props.yaxisName ? me.props.yaxisName.match(/单位：(.+)/)[1] : "";
          let node1 = s.seriesName !== 'bg' ? `<p>${parseInt(s.value)}${yname}</p>` : '';
          return node1;
        }
      },
      grid: {
        top: "40px",
        left: '20px;',
        right: '20px',
        bottom: '10px',
        containLabel: true
      },
      textStyle: {
        color: "#12ffff"
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#1665be'
            },
            symbol: this.props.arrow ? ["none", "arrow"] : [],
            symbolSize: [5, 8]
          },
          axisLabel: {
            fontSize: 14,
            align: 'center',
            // padding: [0, 0, 0, 10]
          },
          axisTick: true,
          boundaryGap: true
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: this.props.yaxisName,
          nameTextStyle: {
            fontSize: 14
          },
          axisLabel: {
            fontSize: 16
          },
          axisTick: false,
          splitLine: {
            lineStyle: {
              color: "#044595",
              type: "dashed",
              opacity: ".6"
            }
          },
          axisLine: {
            show:false,
            lineStyle: {
              color: '#1665be'
            },
            symbol: this.props.arrow ? ["none", "arrow"] : [],
            symbolSize: [5, 8]
          },
          splitNumber: 5,
          scale: false
        }
      ],
      series: [
        {
          name: "xxx",
          type: 'pictorialBar',
          symbol: 'path://M111.554,265h-0.127A196.181,196.181,0,0,1,86,357h50.989A196.185,196.185,0,0,1,111.554,265Z',
          data: [],
          barWidth: 26,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(50,255,254,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(50,255,254,0)'
                },
              ]
            },
            borderColor: 'rgba(50,255,254,1)',
          },
        },
        // {
        //   name: "bg",
        //   type: 'pictorialBar',
        //   barGap: '-100%',
        //   symbolPosition: 'end',
        //   symbol: 'image://' + img,
        //   symbolSize: 20,
        //   symbolOffset: ['28%', '-120%'],
        //   data: ['', '', '', '', ''],
        // }
      ]
    };
  }

  componentDidUpdate() {
    if (this.lock) { this.lock = false } else { return; }
    let me = this;
    me.option.series[0].data = [...me.state.data.series];
    me.option.xAxis[0].data = me.state.data.xAxis;
    me.echart.setOption(me.option, true);

    me.echart.on('mouseOver', function (d) {
      if (d.seriesName == 'bg') { return; }
      let index = d.dataIndex;
      let data = [...me.state.data.series];
      let dataBlank = data.map(s => '');
      dataBlank[d.dataIndex] = d.data;
      let temp = {
        value: d.data,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: .3,
                color: 'rgba(50,255,254,1)'
              },
              {
                offset: 1,
                color: 'rgba(50,255,254,0)'
              },
            ]
          },
        }
      };

      me.option.series[0].data[d.dataIndex] = { ...temp };
      // me.option.series[1].data = [...dataBlank];
      me.echart.setOption(me.option, true);
    });

    me.echart.on('mouseOut', function (d) {
      let index = d.dataIndex;
      let data = [...me.state.data.series];
      let dataBlank = data.map(s => '');

      me.option.series[0].data = data;
      // me.option.series[1].data = [...dataBlank];
      me.echart.setOption(me.option, true);
    });
  }

  render() {
    const me = this;
    return (
      <div style={{
        width: this.props.width,
        height: this.props.height,
      }} ref={'barRef'}></div>
    )
  }
}

export default Page;
