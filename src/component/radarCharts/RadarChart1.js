import React from 'react';
import * as d3 from 'd3';

/**
 * <Chart style={} gride={{x: X轴偏移量, y: Y轴偏移量}} />
 * dataX X轴坐标, 数组, 例: [0,90]
 * dataY Y轴坐标, 数组, 例: ['a','b','c']
 * data 数据, 数组, 例: [{name:'a',value:10},{name:'b',value:20}]
*/

const colorId = [
  { name: 'svg-bar-h-xf-0', value: ['#ffff3b', '#fec710'] },
  { name: 'svg-bar-h-xf-1', value: ['#00ffae', '#52fff1'] },
  { name: 'svg-bar-h-xf-2', value: ['#0eb8ff', '#178aff'] },
  { name: 'svg-bar-h-xf', value: ['#0acdfa', '#62d8ff'] },
];
const textColor = '#c5fdff';
const lineColor = 'rgba(0,255,238,1)';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _setData(d) {
    this.lock = true;
    let dataY = [];
    let countArr = [];
    const len = d.length;
    for (let i = 0; i < len; i++) {
      dataY.push(d[i].name);
      countArr.push(Number(d[i].value));
    }
    let max = ~~Math.max.apply(null, countArr) + '';

    // console.log(max,11111111111)
    // let addN = (Number(max.slice(-2, -1)) + 1) * 10;
    // let addN = max / 6;
    // let maxLen = max.length - 1;
    // if (maxLen == 0) { maxLen = 1; }
    // let headNum = max[0];
    // if (maxLen > 2) { headNum = max.slice(0, -2); maxLen = 2; }
    // let dataX = [0, Number(headNum) * Math.pow(10, maxLen) + addN];
    let dataX = [0, Number(max)];
    this.setState({
      dataY,
      dataX,
      data: d
    });
  }

  componentDidUpdate() {
    if (!this.lock) return;
    d3.select(this.refs.chartRef).select('svg').remove();
    const me = this;
    const width = me.width;
    const height = me.height;
    let svg = d3.select(me.refs.chartRef)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    me.setColor(svg, colorId);
    let scale = me.drawAxis(svg, width, height, me.props.gride ? me.props.gride : []);
    let xScale = scale.x;
    let yScale = scale.y;
    let dx = scale.dx;
    let dy = scale.dy;
    me.drawBar(svg, xScale, yScale, dx, dy, width, height);
    me.tooltip = me.tooltipFn(svg, dx, dy, height);
    me.lock = false;
  }

  componentDidMount() {
    const me = this;
    const width = me.props.style.width;
    const height = me.props.style.height;
    me.width = width;
    me.height = height;
    me.refs.chartRef.addEventListener('mousemove', e => {
      me.toolx = e.offsetX;
      me.tooly = e.offsetY;
    })
  }

  // 坐标轴
  drawAxis(svg, width, height, gride) {
    let dy = gride.y || 40;
    let dx = gride.x || 230;
    let dataY = this.state.dataY;
    let dataX = this.state.dataX;
    // 箭头
    svg.append('defs').append('marker')
      .attr('id', 'svg-arrow')
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .attr('orient', 'auto')
      .attr('viewBox', '-4, -3, 12, 12')
      .append('path')
      .attr('d', 'M0 -4 L10 0 L0 4 L 3 0')
      .attr('transform', 'rotate(90) translate(-3 .5)')
      .style('fill', lineColor)
      .style('stroke-width', 0);

    // x 轴
    let axis = svg.append('g');
    let xScale = d3.scaleLinear()
      .domain(dataX)
      .range([0, width - dx - 30]);
    let xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(7)
      // .tickFormat(function (d) { return d + '%'; })
      .tickSize(0)
      .tickPadding(12);
    let x = axis.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`)
      .call(xAxis);
    x.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', lineColor);
    x.selectAll('text').attr('font-size', 24).attr('fill', textColor);

    // y 轴
    let yScale = d3.scaleBand()
      .domain(dataY)
      .range([height - 2 * dy, 0]);
    let yAxis = d3.axisLeft().scale(yScale)
      .tickSize(0)
      .tickPadding(12);
    this.yStep = yScale.step();
    let y = axis.append('g')
      .attr('transform', `translate(${dx} ${dy})`)
      .call(yAxis);
    y.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', lineColor);
    y.selectAll('text').attr('font-size', '18px').attr('fill', textColor);

    return {
      x: xScale,
      y: yScale,
      dx,
      dy
    };
  }

  // 柱子
  drawBar(svg, x, y, dx, dy, width, height) {

    const me = this;
    let data = me.state.data;
    let len = data.length - 1;
    let barh = 20;
    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);
    let bar = g.selectAll('g').data(data).enter()
      .append('g');

    // bar2 bg
    bar.append('path')
      .attr('d', function (d, i) {
        let h = height - 2 * dy - (y(d.name) + me.yStep / 2);
        let l = x(me.state.dataX[1])
        return `M1,${-(h - barh / 2)} H${l} V${-(h + barh / 2)} H1`;
      })
      .style('fill', 'rgba(36,169,224,.3)');

    // bar1
    bar.append('path')
      .style('fill', function (d, i) {
        let index = len - i;
        return `url(#${index > 2 ? colorId[3].name : colorId[index].name})`
      })
      .style('cursor', 'pointer')
      .on('mouseover', function (d, i) {
        let h = y(d.name) + me.yStep / 2;
        let l = x(d.value) + dx;

        me.refs.chartRef.onmousemove = e => {
          let toolx = e.offsetX;
          let tooly = e.offsetY;
          me.tooltip.transition()
            .duration(400)
            .style('opacity', 1)
            .style('top', `${tooly - 20}px`)
            .style('left', `${toolx + 30}px`);
        }
        // me.tooltip.transition()
        //   .duration(400)
        //   .style('opacity', 1)
        //   .style('top', `${tooly}px`)
        //   .style('left', `${toolx}px`)
        // .attr('transform', `translate(${l - 70},${h + 20})`);
        me.tooltip.select('p').text(`${d.value}${me.props.unit ? me.props.unit : ''}`)
      })
      .on('mouseout', function (d, i) {
        me.refs.chartRef.onmousemove = null;
        me.tooltip.transition()
          .duration(400)
          .style('opacity', 0);
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        let h = height - 2 * dy - (y(d.name) + me.yStep / 2);
        let l = x(d.value) - barh / 2;
        let i = d3.interpolate(0, l);
        return function (t) {
          return `M1,${-(h - barh / 2)} H${l} A${barh / 2},${barh / 2} 0 1,0 ${l},${-(h + barh / 2)} H1`;
        }
      });
  }

  // 渐变
  setColor(svg, arr) {
    const me = this;
    arr.forEach((s, i) => {
      me.colorX(svg, s.name, s.value);
    });
  }

  colorX(svg, id, color) {
    let linear = svg.append('defs').append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    for (let i = 0; i < color.length; i++) {
      linear.append('stop')
        .attr("offset", 100 * i + '%')
        .style("stop-color", color[i]);
    }
  }

  showTooltip(type) {
    this.tooltip.transition()
      .duration(400)
      .style('opacity', type ? 1 : 0);
  }

  tooltipFn(svg, dx, dy, height) {
    const me = this;
    let h = 40;
    let l = 100;
    // let tooltip = svg.append('g')
    //   .attr('opacity', 0)
    //   .attr('transform', `translate(0,-100)`);
    let tooltip = d3.select(me.refs.tooltipRef).style('opacity', 0)
    tooltip.append('p').text('');
    // tooltip.append('path')
    //   .attr('d', `M0,0 H${l} V${h} H0 Z`)
    //   .attr('stroke-width', 3)
    //   .attr('stroke', lineColor)
    //   .attr('fill', 'rgba(29,32,136,.7)');
    // tooltip.append('text')
    //   .attr('x', 10)
    //   .attr('y', 30)
    //   .attr('font-size', 24)
    //   .attr('fill', '#fff')
    tooltip.on('mouseover', () => { me.showTooltip(1) })
      .on('mouseout', () => { me.showTooltip(0) });
    return tooltip;
  }

  render() {
    const me = this;
    return (
      <div style={me.props.style} ref={'chartRef'}>
        <div ref={'tooltipRef'} style={{
          position: 'absolute',
          color: '#fff',
          fontSize: 24,
          padding: '0 10px',
          backgroundColor: 'rgba(29,32,136,.7)',
          border: `1px solid ${lineColor}`,
        }}></div>
      </div>
    );
  }
};

export default Chart;
