//数据占比情况
import React, { Component } from 'react';
import * as d3 from 'd3';
import Ring from './ring.png';
/*css*/
import './gauge.css';

class ShareExchangeProportion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 88,
      count: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      count2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      colors: ['#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#eee']
    };
  };
  _setData(d) {
    this.lock = true;
    this.setState({ data: d })
  };

  render() {
    const me = this;
    return (
      <div style={{ width: me.props.width, height: me.props.height, position: 'absolute', left: me.props.left, top: me.props.top }} ref="gauge"></div>
    )
  }
  _createArc(r, R, startAngle, endAngle) {
    let arc = d3.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(startAngle)
      .endAngle(endAngle)
    return arc()
  }
  componentDidMount() {
    let me = this;
    me.width = me.props.width;
    me.height = me.props.height;
    me.svg = d3.select(me.refs.gauge)
      .append('svg')
      .attr('width', me.width)
      .attr('height', me.height);
    me.g = me.svg.append('g').attr('class', 'g-svg')
  }
  componentDidUpdate() {
    const me = this;
    if (this.lock) { this.lock = false } else { return }
    let oneBlock = Math.PI / 180;
    let liner = d3.scaleLinear()
      .domain([0, 100])
      .range([-150 * oneBlock, 150 * oneBlock])
    const value = liner(me.state.data) + 150 * oneBlock
    const len = value / (oneBlock * 30)
    /**渐变色 */
    me.linearGradient = me.g.append("linearGradient")
      .attr("id", this.props.id || "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    let stop1 = me.linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", me.props.startColor);
    let stop2 = me.linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", me.props.endColor);
    let g = me.g.append('g') //背景
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .selectAll('path')
      .data(me.state.count)
      .enter()
      .append('path')
      .attr('d', function (d, i) {
        return me._createArc(79, 91, (-150 + 30 * i) * oneBlock, (-150 + 30 * i + 30) * oneBlock - oneBlock * 3)
      })
      .attr('fill', function (d, i) {
        return '#045798'
      })
      .attr('opacity', .6)
    let gD = me.g.append('g')//进度条
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .selectAll('path')
      .data(me.state.count)
      .enter()
      .append('path')
      .attr('d', function (d, i) {
        if (i <= len - 1) {
          return me._createArc(80, 90, (-150 + 30 * i) * oneBlock, 30 * oneBlock * (i + 1) - 150 * oneBlock - 3 * oneBlock)
        } else if (i == Math.floor(len)) {
          return me._createArc(80, 90, (-150 + 30 * (i)) * oneBlock, value - 150 * oneBlock)
        }

      })
      .attr('fill', function (d, i) {
        if (i <= len) {
          return 'transparent'
        } else if (i = Math.floor(len)) {
          return 'transparent'
        }
        return 'transparent'
      })
      .transition()
      .delay(function (d, i) {
        return 100 * i
      })
      .attr('fill', function (d, i) {
        if (i <= len) {
          return `url(#${me.props.id})`
        } else if (i = Math.floor(len)) {
          return `url(#${me.props.id})`
        }
        return 'transparent'
      })
    let gL = me.g.append('g') //边框
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .selectAll('path')
      .data(me.state.count)
      .enter()
      .append('path')
      .attr('d', function (d, i) {
        return me._createArc(70, 71, (-150 + 30 * i) * oneBlock, (-150 + 30 * i + 30) * oneBlock - oneBlock * 3)
      })
      .attr('fill', function (d, i) {
        return '#2fcef8'
      })
    let gZ = me.g.append('g') //strick
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .selectAll('path')
      .data(me.state.count2)
      .enter()
      .append('path')
      .attr('d', function (d, i) {
        if (i == 0) {
          return me._createArc(66, 70, (-150 + 30 * i) * oneBlock, (-150 + 30 * i) * oneBlock + oneBlock)
        } else if (i <= 9) {
          return me._createArc(66, 70, (-150 + 30 * i) * oneBlock - 2 * oneBlock, (-150 + 30 * i) * oneBlock - oneBlock)
        } else if (i == 10) {
          return me._createArc(66, 70, (-150 + 30 * i) * oneBlock - 3 * oneBlock, (-150 + 30 * i) * oneBlock + oneBlock - 3 * oneBlock)
        }
      })
      .attr('fill', function (d, i) {
        return '#2fcef8'
      })
    let text = me.g.append('g') //文字
      .attr('transform', `translate(${me.width / 2 - 8} ${me.height / 2})`)
      .selectAll('text')
      .data(me.state.count2)
      .enter()
      .append('text')
      .text(function (d) {
        return d
      })
      .attr('fill', '#31d6ff')
      .attr('x', function (d, i) {
        return Math.sin(-oneBlock * (i + 1) * 30) * 54
      })
      .attr('y', function (d, i) {
        return Math.cos(oneBlock * (i + 1) * 30) * 54
      })
      .attr('text-anchor', 'center')
      .attr('dominant-baseline', 'middle')
    let textTitle = me.g.append('text')//标题
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .text(me.props.title || '创业指数')
      .attr('fill', '#31d6ff')
      .attr('text-anchor', "middle")
      .attr('y', '78px')
      .style('font-size', '10')
    let textCount = me.g.append('text')//百分比
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .text(me.state.data + '%')
      .attr('fill', me.props.endColor)
      .attr('text-anchor', "middle")
      .attr('y', '38px')
      .style('font-size', '20')
    let img = me.g.append('image')
      .attr('x', '144')
      .attr('y', '140')
      .attr('width', '82')
      .attr('height', '20')
      .attr('xlink:href', `${Ring}`)
      .attr('transform', `rotate(120)`)
      .attr('transform-origin', '150 150')
      .style('transition', 'all 1s')
    setTimeout(function () {
      if (me.state.data % 10 == 0) {
        img.attr('transform', `rotate(${me.state.data * 3 + 117})`)
      } else {
        img.attr('transform', `rotate(${me.state.data * 3 + 120})`)
      }

    }, 200)
  }

}

export default ShareExchangeProportion;
