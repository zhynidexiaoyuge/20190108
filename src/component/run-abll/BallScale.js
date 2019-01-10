import { createElementNS, SVG_NS, Timer, UiComponent } from '@jusfoun-vis/common';
import { arc, scaleLinear, select } from 'd3';
import { PI, UA } from '../common/MathConstant';
import uuid from 'uuid';

/**
 * 默认值
 * @type {number}
 */
const defaultValue = 50;

/**
 * 水球占比图
 * @author msh
 */
class RingDiagram extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._domElement = createElementNS(SVG_NS, 'svg');
    const svg = select(me._domElement);
    const ballGroup = svg.append('g');
    const text = svg.append('text');
    me._border = svg.append('path');
    me._ball = ballGroup.append('path');
    me._arc = arc();
    me._svg = svg;
    me._ballGroup = ballGroup;
    me._text = text;
  }

  /**
   * 中心文字
   * @returns {text}
   */
  get text() {
    return this._text;
  }

  /**
   * 球
   * @returns {path}
   */
  get ball() {
    return this._ball;
  }

  /**
   * 画布
   * @returns {svg}
   */
  get svg() {
    return this._svg;
  }

  /**
   * 球 所在的组
   * @returns {g}
   */
  get ballGroup() {
    return this._ballGroup;
  }

  /**
   * border
   * @returns {path}
   */
  get border() {
    return this._border;
  }

  /**
   * container
   * @returns {domElement}
   */
  get domElement() {
    return this._domElement;
  }

  _value = defaultValue;
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.updateValue();
  }

  _fontSize = 12;
  get fontSize() {
    return this._fontSize;
  }

  set fontSize(value) {
    this._fontSize = value;
    this.updateValue();
  }

  _fontColor = '#fff';
  get fontColor() {
    return this._fontColor;
  }

  set fontColor(color) {
    this._fontColor = color;
    this.UpdateTextStopColor();
  }

  _width = undefined;
  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this.updateSize();
  }

  _height = undefined;
  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this.updateSize();
  }

  _speed = .5;
  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
    this.updateSize();
  }

  _peak = 5;
  get peak() {
    return this._peak;
  }

  set peak(value) {
    this._peak = value;
    this.updateSize();
  }

  _stopColor = undefined;
  get stopColor() {
    return this._stopColor;
  }

  set stopColor(colors) {
    this._stopColor = colors;
    this.updateBallStopColor();
  }

  _borderStopColor = undefined;
  get borderStopColor() {
    return this._borderStopColor;
  }

  set borderStopColor(colors) {
    this._borderStopColor = colors;
    this.UpdateBorderStopColor();
  }

  _borderWidth = undefined;
  get borderWidth() {
    return this._borderWidth;
  }

  set borderWidth(value) {
    this._borderWidth = value;
    this.UpdateBorderStopColor();
  }

  /**
   * 半径
   * @returns {number}
   */
  get radius() {
    return Math.min(this.width, this.height) / 2;
  }

  /**
   * 宽高更新开关
   * @type {boolean}
   */
  isUpdateSize = false;

  /**
   * 宽高更新函数
   */
  updateSize() {
    this.isUpdateSize = true;
    this.invalidateProperties();
  }

  /**
   * 数值更新开关
   * @type {boolean}
   */
  isUpdateValue = false;

  /**
   * 球填充色更新函数
   */
  updateValue() {
    this.isUpdateValue = true;
    this.invalidateProperties();
  }


  /**
   * 球填充色更新开关
   * @type {boolean}
   */
  isUpdateBallStopColor = false;

  /**
   * 球填充色更新函数
   */
  updateBallStopColor() {
    this.isUpdateBallStopColor = true;
    this.invalidateProperties();
  }

  /**
   * border填充色更新开关
   * @type {boolean}
   */
  isUpdateBorderStopColor = false;

  /**
   * border填充色更新函数
   */
  UpdateBorderStopColor() {
    this.isUpdateBorderStopColor = true;
    this.invalidateProperties();
  }

  /**
   * 文字填充色更新开关
   * @type {boolean}
   */
  isUpdateTextStopColor = false;

  /**
   * 文字填充色更新函数
   */
  UpdateTextStopColor() {
    this.isUpdateTextStopColor = true;
    this.invalidateProperties();
  }

  /**
   * 渐变
   * @param color
   * @returns {'#id'}
   */
  linearGradient(color) {
    const me = this;
    const svg = me.svg;
    const id = uuid();
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

    return '#' + id;
  }

  /**
   * 计算波浪path
   */
  getPath() {
    const me = this;
    const temWidth = me.width * 2;
    const cycle = 720;

    const _scaleLinear = scaleLinear()
      .range([0, temWidth])
      .domain([0, cycle]);

    let path = [];

    for (let i = 0; i < (cycle + 1); i++) {
      const peakValue = Math.sin(i * UA) * me.peak;
      const y = (1 - me.value / 100) * me.height + peakValue;
      const x = _scaleLinear(i);
      if (i === 0)
        path.push(`M${x},${y} `);
      else
        path.push(`L${x},${y} `)
    }

    return path.concat([`L${temWidth},${me.height} `, `L0,${me.height} Z`]).join('');
  }

  commitProperties() {
    const me = this;
    const domElement = me.domElement;
    const style = domElement.style;

    let ballGroup = me.ballGroup;
    let border = me.border;
    let ball = me.ball;
    let arc = me._arc;
    let path = '';
    let text = me.text;

    if (me.isUpdateBallStopColor) {
      me.isUpdateBallStopColor = false;
      let color = '';
      if (Array.isArray(me.stopColor)) {
        color = `url(${me.linearGradient(me.stopColor)})`;
      } else {
        color = me.stopColor;
      }
      ball
        .attr("fill", color);
    }

    if (me.isUpdateBorderStopColor) {
      me.isUpdateBorderStopColor = false;
      let color = '';
      if (Array.isArray(me.borderStopColor)) {
        color = `url(${me.linearGradient(me.borderStopColor)})`;
      } else {
        color = me.borderStopColor;
      }
      border
        .attr("fill", color);
    }

    //  默认字体颜色
    text.attr("fill", me._fontColor);

    if (me.isUpdateTextStopColor) {
      me.isUpdateTextStopColor = false;
      let color = '';
      if (Array.isArray(me.fontColor)) {
        color = `url(${me.linearGradient(me.fontColor)})`;
      } else {
        color = me.fontColor;
      }
      text
        .attr("fill", color)
    }

    if (me.isUpdateSize) {
      me.isUpdateSize = false;

      const radius = me.radius;
      style.width = me.width;
      style.height = me.height;
      style.borderRadius = radius + 'px';

      const temWidth = me.width * 2;

      ballGroup.attr('transform', `translate(${-temWidth / 2} 0)`);

      //  动画
      let x = -temWidth / 2;
      let speed = me.speed;
      const timer = new Timer(Timer.REQUEST_ANIMATION_FRAME);
      timer.on('timer', function () {
        x += speed;
        if (x > 0) x = -temWidth / 2;
        ballGroup.attr('transform', `translate(${x} 0)`);
      });
      timer.start();

      //  border
      const _arc = arc.outerRadius(me.radius)
        .innerRadius(me.radius - me.borderWidth)
        .startAngle(0)
        .endAngle(2 * PI);

      border
        .attr('transform', `translate(${me.radius} ${me.radius})`)
        .attr('d', _arc());
    }

    if (me.isUpdateValue) {
      me.isUpdateValue = false;
      path = me.getPath();
      ball
        .attr("stroke-width", 0)
        .transition()
        .duration(1000)
        .attr("d", path);
      text
        .attr('x', me.radius)
        .attr('y', me.radius)
        .attr('dy', '0.35em')
        .text(me.value + '%')
        .attr('font-size', me.fontSize)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')

    }
  }
}

export default RingDiagram;
