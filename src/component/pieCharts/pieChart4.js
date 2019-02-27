import React from 'react';
import * as  d3 from 'd3';
import bgIcon from './bgIcon.png';
class Age extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  _setData(d) {
    this.lock = true;
    this.setState({
      data: d
    })
  }
  render() {
    const me = this;
    let arrData = [];
    if (me.state.data) {
      arrData.push({
        name: me.state.data[4].name,
        val: me.state.data[4].value
      })
    } else {
      arrData = [{}]
    }
    return (
      <div>
        <div ref={'ageSvg'} style={{
          position: 'absolute',
          left: 30,
          top: 11
        }}></div>
        <div style={{
          width: 127,
          height: 60,
          background: `url(${bgIcon})`,
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          left: 157,
          top: 20,
          textAlign: 'left',
          paddingLeft: 20,
          paddingTop: 6,
          fontSize: 20,
          color: '#fff'
        }}>
          <span ref={'companyName'}>{arrData[0].name}</span><br />
          <span ><i ref={'companyVal'} style={{ color: '#0186f6' }}>{arrData[0].val}</i></span>
        </div>
      </div>
    )
  }

  _createArc(r, R, start, end) {
    let arc = d3.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end)
      .cornerRadius([30])
    return arc()
  }
  componentDidMount() {
    const me = this;
    let width = 428;
    let height = 264;
    me.color = ['#008bff', '#0dd8ff', '#46efc4', '#83f24e', '#e2f357'].reverse()
    me.svg = d3.select(me.refs.ageSvg).append('svg')
      .attr('width', width)
      .attr('height', height)

  }
  componentDidUpdate() {
    const me = this;
    if (!me.lock) { return }
    if (!me.state.data) { return }
    let svg = me.svg;
    let data = me.state.data;
    let colors = me.color;
    let r = 30;
    let R = 40;
    //转换数据
    let pie = d3.pie().sort(null).value(function (d) {
      return d.value
    })
    let pieData = pie(data);
    //liner值域

    let max = d3.max(data, function (d, i) {
      return d.value
    })
    let linear = d3.scaleLinear()
      .domain([0, max])
      .range([2 * Math.PI, 90 * Math.PI / 180])

    //绘制path
    let gHalf = svg.append('g').attr('transform', 'translate(120,120)').attr('class', 'g-half')
    gHalf.selectAll('path').data(pieData).enter().append('path')
      .on('mouseover', function (d, i) {
        me.refs.companyName.innerHTML = d.data.name;
        me.refs.companyVal.innerHTML = d.data.value;
        me.refs.companyVal.style.color = me.color[i]
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d, i) {

        let moves = d3.interpolate(2 * Math.PI, linear(d.value));
        return function (t) {
          return me._createArc(r + (i * 18), R + (i * 18), 2 * Math.PI, moves(t))
        }
      })
      .attr('fill', function (d, i) {
        return colors[i]
      })

    let gLegend = svg.append('g').attr('class', 'g-legend')
      .attr('transform', 'translate(-150,-50)')
    let rect = gLegend.selectAll('rect').data(pieData).enter().append('rect')
      .attr('width', 20)
      .attr('height', 9)
      .attr('x', function (d, i) {
        return 420
      })
      .attr('y', function (d, i) {
        return 100 + 40 * i
      })
      .attr('stroke-width', 1)
      .attr('fill', function (d, i) {
        return me.color[i]
      })
    let text = gLegend.selectAll('text').data(pieData).enter().append('text')
      .text(function (d, i) {
        return d.data.name
      })
      .attr('x', function (d, i) {
        return 480
      })
      .attr('y', function (d, i) {
        return 105 + 40 * i
      })
      .attr('fill', '#fff')
      .attr('text-anchor', "middle")

  }
}
export default Age;