import React from 'react';
import * as d3 from 'd3';

const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const color = [
  'rgba(247,79,91,1)',
  'rgba(254,210,50,1)',
  'rgba(50,255,254,1)',
  'rgba(44,254,143,1)',
  'rgba(0,163,233,1)'
];

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: '光岳楼',
          value: '10'
        },
        {
          name: '景阳冈',
          value: '20'
        },
        {
          name: '狮子楼',
          value: '30'
        },
        {
          name: '宋代铁塔',
          value: '10'
        },
        {
          name: '东昌湖',
          value: '30'
        },
        {
          name: '古运河',
          value: '10'
        },
        {
          name: '门票',
          value: '20'
        },
        {
          name: '旅游',
          value: '30'
        },
        {
          name: '攻略',
          value: '10'
        },
      ]
    };
  }

  _setData(d) { }

  componentDidMount() {
    const me = this;
    const width = me.props.width;
    const height = me.props.height;
    let data = me.state.data;

    let svg = d3.select(me.refs.wordCloud)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    //力导向布局
    me.force = d3.forceSimulation()
      // .alphaDecay(0.1) // 设置alpha衰减系数
      // .force("link", d3.forceLink().distance(100)) // distance为连线的距离设置
      // .force('collide', d3.forceCollide().radius(() => 80)) // collide 为节点指定一个radius区域来防止节点重叠。
      // .force("charge", d3.forceManyBody().strength(-20))  // 节点间的作用力
      .force("center", d3.forceCenter(width / 2, height / 2)) //设置力的中心
      .force("y", d3.forceY().strength(0.07))
      .force("x", d3.forceX().strength(0.01))
      .force("charge", d3.forceManyBody().strength(-20))
      .force("collide", d3.forceCollide().radius(50).iterations(1))

    let g = svg.append('g');
    let node = g.selectAll('circle').data(data).enter()
      .append('circle')
      .attr('r', function () { return 30 + Math.random() * 20 });
    let text = g.selectAll('text').data(data).enter().append('text')
      .text(function (d) { return d.name })
      .attr('fill', 'red')
      .attr('font-size', function () { return 14 + 24 * Math.random() })

    me.force.nodes(data)   // 节点数据
      // .alpha(1) // 设置alpha值，让里导向图有初始动力
      .on('tick', ticked)
    // .restart()   // 启动仿真计时器

    function ticked() {
      // node.attr('cx', function (d) { return d.x })
      //   .attr('cy', function (d) { return d.y });

      text.attr('x', function (d) { return d.x })
        .attr('y', function (d) { return d.y })
      // .attr('dx', '-1em')

    }
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div ref={'wordCloud'} className={'pieChart'} style={{ width: props.width, height: props.height, position: 'absolute', top: props.top, left: props.left }} >
      </div >
    );
  }
};

export default Page;
