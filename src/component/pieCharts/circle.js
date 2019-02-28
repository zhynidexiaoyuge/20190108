//数据占比情况
import React, { Component } from 'react';
import * as d3 from 'd3';
/*css*/
import './gauge.css';
const len = [''];
class ShareExchangeProportion extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };
  _setData(d) {
    this.lock = true;
    this.setState({ data: d })
  };
  _addList() {
    const me = this;
    if (!me.state.data) { return };
    let str = null;
    let name = me.state.data.name;
    if (name.length > 3) {
      str = name.slice(0, 5) + '\n' + name.slice(5, name.length - 1);

    } else {
      str = name
    }
    return <div style={{
      width: 80,
      fontSize: 16,
      color: '#fff',
      position: 'absolute',
      left: this.props.leftText,
      top: 159,
      textAlign: 'center'
    }}>{str}</div>
  }
  render() {
    const me = this;
    return (
      <div>
        <div style={{ width: me.props.width, height: me.props.height, position: 'absolute', left: me.props.left, top: me.props.top }} ref="gauge"></div>
        {this._addList()}
      </div>
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
    // let me = this;
    me.width = me.props.width;
    me.height = me.props.height;
    me.svg = d3.select(me.refs.gauge)
      .append('svg')
      .attr('width', me.width)
      .attr('height', me.height)
  }
  componentDidUpdate() {
    const me = this;
    if (!me.lock) { return }
    /**渐变色 */
    me.linearGradient = me.svg.append("linearGradient")
      .attr("id", this.props.id || "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    let stop1 = me.linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", me.props.startColor);
    let stop2 = me.linearGradient.append("stop")
      .attr("offset", "50%")
      .style("stop-color", me.props.endColor);
    let stop3 = me.linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", me.props.startColor);
    let g = me.svg.append('g')
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .selectAll('path')
      .data(len)
      .enter()
      .append('path')
      .attr('d', function (d, i) {
        return me._createArc(50, 60, 0, 360)
      })
      .attr('fill', function (d, i) {
        return `url(${'#' + me.props.id})`
      })
      .attr('stroke', me.props.startColor)
    let text = me.svg.append('text')//百分比
      .attr('transform', `translate(${me.width / 2} ${me.height / 2})`)
      .text(me.state.data.value + '人')
      .style('font-size', 20)
      .attr('fill', me.props.startColor)
      .attr('text-anchor', "middle")
      .attr('dominant-baseline', "middle")

    // let text2 = me.svg.append('text')//百分比
    //   .attr('transform', `translate(${me.width / 2} ${0})`)
    //   .text(me.state.data.name)
    //   .style('font-size', 16)
    //   .attr('fill', '#fff')
    //   .attr('text-anchor', "middle")
    //   .attr('y', 170)
  }
}

export default ShareExchangeProportion;
