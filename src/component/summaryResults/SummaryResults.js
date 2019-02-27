import React, {Component} from 'react';
import * as d3 from 'd3';
import './SummaryResults.css';

/**
 * 涉海技术成果类别统计
 * */

class SummaryResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        name: '软科学',
        val: 200
      }, {
        name: '基础理论',
        val: 70
      }, {
        name: '应用技术',
        val: 90
      }],
      unit: '个',
      title: this.props.title || '',
      scale: this.props.scale || 1
    };
    this.fillColor = ['rgba(0,255,160,0.35)', 'rgba(0,255,232,0.35)', 'rgba(0,128,203,0.35)', 'rgba(0,120,255,0.35)', 'rgba(77,115,255,0.35)', 'rgba(255,83,132,0.35)', 'rgba(255,246,0,0.35)'];
    this.boderColors = ['rgba(0,255,160,1)', 'rgba(0,255,232,1)', 'rgba(0,128,203,1)', 'rgba(0,120,255,1)', 'rgba(77,115,255,1)', 'rgba(255,83,132,1)', 'rgba(255,246,0,1)'];
    this._w = this.props.width || 460;
    this._h = this.props.height || 240;

  }

  get width() {
    return this._w
  }

  get height() {
    return this._h;
  }

  get data() {
    let datas = this.props.data || this.state.data;
    return datas;
  }

  get inColor() {
    return this.fillColor
  }

  get outColor() {
    return this.boderColors
  }

  // 单位
  get unit() {
    return this.props.unit || this.state.unit
  }

  // 缩放比例
  get scale() {
    return this.state.scale
  }

  render() {
    return (<div style={{width: this.props.width, height: this.props.height, marginTop: 0}}>
      <div ref={'ballChart'}></div>
    </div>)
  }

  createWave(val) {
    let me = this;
    let x = d3.scaleLinear()
      .domain([0, 100])
      .range([50, -50]);
    const value = val ? val : me.data[0].val;
    const num = Math.ceil(value / me.sum * 100);
    const svg = me.svg;
    const q = 30;
    // 定义圆环裁剪路径，制作波浪路径，用圆环裁剪波浪
    svg.append('defs')
      .append('clipPath')
      .attr('id', 'clip_path')
      .append('circle')
      .attr('r', 50)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('transform', 'translate(0,0)');
    // 定义二个不同位置的波浪，通过切换波浪，实现动画效果
    let d0 = `M${-300},${x(num)},q${50} ${q},${100} ${0}t100,0t100,0t100,0V100,H-300 Z`;
    // 移动终点v
    let d1 = `M${-100},${x(num)},q${50} ${q},${100} ${0}t100,0t100,0t100,0V100,H-50 Z`;

    svg.select('.path').remove();
    let wave = svg.append('path')
      .attr('class', 'path')
      .attr('fill', '#2faaab')
      .attr('opacity', 0.6)
      .attr('d', d0)
      .attr('transform', `translate(0,0)`)
      .attr('clip-path', 'url(#clip_path)');

    /* 定时切换不同的波浪 */

    function waveTransition(isFirst) {
      if (!isFirst) wave.interrupt().attr("d", d0); // 归位
      wave.transition().ease(d3.easeLinear) // 动画效果 缓出
        .duration(4000)
        .delay(0)
        .attr("d", d1); // 动画时间与路径
      setTimeout(waveTransition, 4000); // 重启动画
    };
    waveTransition(true);

  }

  createOutCircle() {
    let me = this;
    const svg = me.svg;
    const innerRadius = 55;
    const outerRadius = 75;
    let g = svg.append('g');
    // 创建弧生成器
    let arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .padAngle(0.05);
    // 创建第二个弧生成器，用于移入区域变大
    let arc2 = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius + 10)
      .padAngle(0.07);
    // 饼图数据转换
    let pie = d3.pie()
      .value(function (d) {
        return d.val;
      });
    let pieData = pie(me.data);
    // 添加group g，添加移入移出动画效果
    let arc_g = g.selectAll('g')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', function (d, i) {
        return `g${i} g`
      })
      .on('mouseover', function (d) {
        d3.selectAll('.default_path').transition().attr('d', function (d) {
          return arc(d);
        });
        d3.select(this).select('path').transition().attr('d', function (d) {
          return arc2(d);
        });
        me.addTxt(d.data.val);
        me.createWave(d.data.val);
      })
      .on('mouseout', function (d) {
        // d3.select(this).select('path').transition().attr('d', function (d) {
        //   return arc(d);
        // });
      });

    // 添加path路径
    let arc_path = arc_g.append('path')
      .attr('d', function (d) {
        return arc(d)
      })
      .attr('fill', function (d, i) {
        return me.inColor[i];
      })
      .attr('class', 'default_path')
      .attr('stroke-width', 2)
      .attr('stroke', function (d, i) {
        return me.outColor[i];
      });

    // 默认显示第一个
    d3.select('.g0')
      .data(pieData)
      .select('path')
      .transition()
      .attr('d', function (d) {
        return arc2(d)
      });
    // 绘制引导线
    arc_g.append('path')
      .attr('stroke', '#0191b2')
      .attr('fill', 'transparent')
      .attr('d', d => {
        let x1 = arc.centroid(d)[0] * 1.2;
        let y1 = arc.centroid(d)[1] * 1.2;
        let x2 = arc.centroid(d)[0] * 1.5;
        let y2 = arc.centroid(d)[1] * 1.5;
        return `M${x1},${y1}L${x2},${y2}H${x2 * 1.7}`
      });
    arc_g.append('circle')
      .attr('cx', d => {
        let x = arc.centroid(d)[0] * 1.5;
        return x * 1.7
      })
      .attr('cy', d => {
        let y = arc.centroid(d)[1] * 1.5;
        return y
      })
      .attr('r', 3)
      .attr('fill', (d, i) => {
        return me.outColor[i]
      });
    arc_g.append('text')
      .attr('fill', '#ffffff')
      .attr('font-size', 16)
      .attr('text-anchor', 'middle')
      .attr('dx', d => {
        let x = arc.centroid(d)[0] * 1.5;
        return x * 1.7
      })
      .attr('dy', d => {
        let y = arc.centroid(d)[1] * 1.7;
        return y
      })
      .text((d, i) => {
        return d.data.name //+ d.data.val + me.unit
      })
  }

  addTxt(txt) {
    let me = this;
    const svg = me.svg;
    d3.select('.percentVal').remove();
    svg.append('text')
      .attr('class', 'percentVal')
      .attr('font-size', '30px')
      .attr('dy', 10)
      .attr('font-family', '微软雅黑')
      .style('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(function () {
        let percent = parseInt((txt / me.sum).toFixed(2) * 100);
        return percent + '%';
      });
  }

  componentDidMount() {
    const me = this;
    const domEle = me.refs.ballChart;
    const w = me.width;
    const h = me.height;
    const datas = me.data;
    me.sum = 0;
    datas.forEach((t, i) => {
      me.sum += t.val;
    });
    const svg = d3.select(domEle)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', `translate(${w / 2},${h / 2 + 10}) scale(${me.scale},${me.scale})`);
    me.svg = svg;
    //创建中心圆
    svg.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('r', 50)
      .style('fill', '#0e2a60')
      .style('strokeWidth', 5)
      .style('stroke', '#03c0f7');
    // 延时加载
    setTimeout(me.createWave(), 2000);
    me.createOutCircle();
    me.addTxt(datas[0].val) // 默认显示第一组值
  }
}

export default SummaryResults;
