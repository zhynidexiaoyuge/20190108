import React from 'react';
import echarts from 'echarts';

const color = [
  'rgba(7,127,254,1)',
  'rgba(241,255,88,1)',
  'rgba(96,249,181,1)',
  'rgba(1,255,246,1)',
  'rgba(26,205,250,1)'
];
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _setData(d) {
    this.lock = true;
    d.map(s => { s.selected = true; });
    this.setState({ data: d });
  }

  componentDidUpdate() {
    if (this.lock) {
      const me = this;
      me.option.series[0].data = me.state.data;
      me.chart.setOption(me.option, true);
      me.lock = false;
    }
  }

  componentDidMount() {
    const me = this;
    const width = me.props.style.width;
    const height = me.props.style.height;
    let r = width > height ? height : width;

    let chart = echarts.init(me.refs.chartRef);
    let option = {
      color: color,
      series: [
        {
          name: '面积模式',
          type: 'pie',
          selectedMode: 'multiple',
          selectedOffset: 0,
          radius: [(r - 100) / 4, (r - 100) / 2],
          center: ['50%', '50%'],
          roseType: 'area',
          data: [],
          label: {
            formatter: function (d) {
              return `${d.name == '中国国际旅行社' ? '中国国际\n旅行社' : d.name}\n${d.value}万`
            },
            fontSize: 16,
            color: '#e0fbff'
          },
          itemStyle: {
            border: 0,
            color: function (d) {
              let index = d.dataIndex;
              return color[index];
            },
          }
        }]
    };
    me.chart = chart;
    me.option = option;
  }

  render() {
    const me = this;
    return (
      <div style={{
        position: 'absolute',
        top: me.props.top
      }}>
        <div ref={'chartRef'} style={me.props.style}></div>
      </div>
    );
  }
};

export default Chart;
