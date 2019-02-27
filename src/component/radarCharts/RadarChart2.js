import React from 'react';
import * as d3 from 'd3';

const color = 'rgba(0,255,238,1)';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {
      name: [],
      data: [],
      dataX: []
    };
  }

  _setData(d) {
    this.lock = true;
    let max1 = d3.max(d.data.oldP, s => s.value);
    let max2 = d3.max(d.data.newP, s => s.value);
    this.max = max1 + max2;

    this.setState({
      data: d.data,
      name: d.name,
      dataX: d.dataX
    });
  }

  componentDidUpdate() {
    if (!this.lock) return;
    const me = this;
    let scale = me.drawAxis(me.svg, me.width, me.height);
    let xScale = scale.x;
    let yScale = scale.y;
    let dx = scale.dx;
    let dy = scale.dy;
    me.drawBar(me.svg, xScale, yScale, dx, dy, me.width, me.height);
    me.lock = false;
    me.tooltip = document.querySelector('#svg-bar-tooltip-xf');
    me.tooltipNew = d3.select('#svg-bar-tooltip-xf-cnt0');
    me.tooltipOld = d3.select('#svg-bar-tooltip-xf-cnt1');
  }

  componentDidMount() {
    const me = this;
    const width = me.props.style.width;
    const height = me.props.style.height;
    let svg = d3.select(me.refs.chartRef)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    me.setColor(svg);
    me.svg = svg;
    me.width = width;
    me.height = height;

  }

  // 坐标轴
  drawAxis(svg, width, height) {
    let dy = 40;
    let dx = 100;
    const textColor = '#c5fdff';
    const lineColor = 'rgba(0,255,238,1)';
    const lineColorBg = 'rgba(0,255,238,.1)';
    let dataX = this.state.dataX || ['0301', '0302', '0303', '0304', '0305'];

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
      .style('fill', color)
      .style('stroke-width', 0);

    // x 轴
    let axis = svg.append('g');
    let xScale = d3.scaleBand()
      .domain(dataX)
      .range([0, width - 2 * dx]);
    let xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(6)
      // .tickFormat(function (d) { return d + '%'; })
      .tickSize(0)
      .tickPadding(12);
    let x = axis.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`)
      .call(xAxis);
    x.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', lineColor);
    x.selectAll('text').attr('font-size', 24).attr('fill', textColor).attr("dx", "1.3em");

    // y 轴
    let yScale = d3.scaleLinear()
      .domain([0, this.max])
      .range([height - 2 * dy, 0]);
    let yAxis = d3.axisLeft().scale(yScale)
      .tickSize(0)
      .ticks(6)
      .tickPadding(12);
    let y = axis.append('g')
      .attr('transform', `translate(${dx} ${dy})`)
      .call(yAxis);
    y.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', lineColor);
    y.selectAll('text').attr('font-size', 24).attr('fill', textColor);

    // 背景线
    y.selectAll('.tick').append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width - 2 * dx)
      .attr('y2', 0)
      .attr('stroke-width', 2)
      .attr('stroke', lineColorBg);

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
    let oldP = me.state.data.oldP;
    let newP = me.state.data.newP;

    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);
    let bar = g.selectAll('g').data(oldP).enter()
      .append('g')
      .on('mouseover', function (d, i) {
        me.tooltipOld.text(d.value + me.props.unit);
        me.tooltipNew.text(newP[i].value + me.props.unit);
        let l = x(d.date) + dx;
        me.tooltip.style.left = l + 'px';
        me.tooltip.style.opacity = 1;
      })
      .on('mouseout', function () {
        me.tooltip.style.opacity = 0;
      });

    //bar3 bg
    bar.append('path')
      .attr('d', function (d, i) {
        let h = height - y(700) - 2 * dy;
        let l = x(d.date) + dx;
        return `M${l},0 H${l - 50} V-${h} H${l} V0`
      })
      .style('fill', 'rgba(33,167,223,.2)');
    bar.append('path')
      .attr('d', function (d, i) {
        let h = height - y(700) - 2 * dy;
        let l = x(d.date) + dx;
        return `M${l},0 L${l + 12},-12 V-${h + 12} L${l},-${h}`
      })
      .style('fill', 'rgba(36,169,224,.3)');
    bar.append('path')
      .attr('d', function (d, i) {
        let h = height - y(700) - 2 * dy;
        let l = x(d.date) + dx;
        return `M${l + 12},-${h + 12} H${l + 12 - 50} L${l - 50},-${h} H${l}`
      })
      .style('fill', 'url(#svg-bar-3)');

    //bar2
    bar.append('path')
      .style('fill', 'url(#svg-bar-2)')
      .transition()
      .duration(function (d, i) {
        let t = parseFloat((d.value + newP[i].value) / d.value, 2)
        return t * 1000;
      })
      .attrTween('d', function (d, i) {
        let h = height - y(d.value + newP[i].value) - 2 * dy;
        let l = x(d.date) + dx;
        let diff = d3.interpolate(0, h);
        return function (t) {
          return `M${l},0 H${l - 50} V-${diff(t)} H${l} V0`;
        }
      });
    bar.append('path')
      .style('fill', 'url(#svg-bar-22)')
      .transition()
      .duration(function (d, i) {
        let t = parseFloat((d.value + newP[i].value) / d.value, 2)
        return t * 1000;
      })
      .attrTween('d', function (d, i) {
        let h = height - y(d.value + newP[i].value) - 2 * dy;
        let l = x(d.date) + dx;
        let diff = d3.interpolate(0, h);
        return function (t) {
          return `M${l},0 L${l + 12},-12 V-${diff(t) + 12} H${l + 12 - 50} L${l - 50},-${diff(t)} H${l}`
        }
      });

    //bar1
    bar.append('path')
      .style('fill', 'url(#svg-bar-1)')
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        let h = height - y(d.value) - 2 * dy;
        let l = x(d.date) + dx;
        let i = d3.interpolate(0, h);
        return function (t) {
          return `M${l},0 H${l - 50} V-${i(t)} H${l} V0`;
        }
      });
    bar.append('path')
      .style('fill', 'url(#svg-bar-11)')
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        let h = height - y(d.value) - 2 * dy;
        let l = x(d.date) + dx;
        let i = d3.interpolate(0, h);
        return function (t) {
          return `M${l},0 L${l + 12},-12 V-${i(t) + 12} L${l},-${i(t)}`
        }
      });
  }

  // 渐变
  setColor(svg) {
    const me = this;
    me.colorY(svg, 'svg-bar-1', ['rgba(98,216,255,1)', 'rgba(94,255,204,1)']);
    me.colorY(svg, 'svg-bar-11', ['rgba(69,183,221,1)', 'rgba(59,209,161,1)']);
    me.colorY(svg, 'svg-bar-2', ['rgba(255,255,114,1)', 'rgba(255,252,0,1)']);
    me.colorY(svg, 'svg-bar-22', ['rgba(199,199,38,1)', 'rgba(222,224,47,1)']);
    me.colorY(svg, 'svg-bar-3', ['rgba(33,167,223,.1)', 'rgba(95,254,205,.2)']);
  }

  colorY(svg, id, color) {
    let linear = svg.append('defs').append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    for (let i = 0; i < color.length; i++) {
      linear.append('stop')
        .attr("offset", 100 * i + '%')
        .style("stop-color", color[i]);
    }
  }

  render() {
    const me = this;
    const tooltipColor = ['rgba(255,255,51,1)', 'rgba(94,252,207,1)'];
    return (
      <div style={me.props.style} ref={'chartRef'}>
        <p style={{
          position: 'absolute',
          top: -30,
          left: 40,
          fontSize: 24,
          color: '#c5fdff',
        }} >{me.props.unit ? `单位：${me.props.unit}` : ''}</p>
        <ul style={{
          width: 260,
          position: 'absolute',
          top: -30,
          right: 150,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 24,
          color: '#fff',
        }}>
          {me.state.name.map((s, i) => {
            return (
              <li key={'xf' + i} style={{
                display: 'flex',
                alignItems: 'center'
              }} >
                <p style={{
                  width: 25,
                  height: 25,
                  backgroundColor: tooltipColor[i],
                  marginRight: 10
                }}></p>
                <p>{s}</p>
              </li>
            );
          })}
        </ul>
        <ul style={{
          width: 200,
          height: 80,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          fontSize: 24,
          color: '#fff',
          backgroundColor: 'rgba(17,22,65,.7)',
          borderRadius: '4px',
          transition: 'all .5s'
        }} id={'svg-bar-tooltip-xf'}>
          {me.state.name.map((s, i) => {
            return (
              <li key={'xf' + i} style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10
              }} >
                <p>{s}: </p>
                <p id={'svg-bar-tooltip-xf-cnt' + i} ></p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Chart;
