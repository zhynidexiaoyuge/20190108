import React from 'react';

import BallScale from './BallScale';
import CirclePie from './CirclePie';

/**
 * 环形占比图
 */
class NewOldScale extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {};
  }

  _setData(d) {
    this.lock = true;
    this.setState({ data: d });
  }

  componentDidUpdate() {
    if (!this.lock) { return }
    let value = this.state.data;
    this.pie.data = value;
    this.ringDiagram.value = value;
    this.lock = false;
  }

  render() {
    const me = this;
    const props = me.props;
    const width = props.width;
    const height = props.height;
    const top = props.top;
    const left = props.left;
    return (
      <div
        style={{
          position: 'absolute',
          top,
          left,
          width,
          height
        }}
        ref={ref => {
          me.container = ref;
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 110,
          height: 110,
          transform: 'translate(-50%,-50%)'
        }} ref={'ballContainer'} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 150,
          height: 150,
          transform: 'translate(-50%,-50%)'
        }} ref={'pieContainer'} />
        <div style={{
          fontSize: 16,
          color: '#fff',
          position: 'absolute',
          top: this.props.tops || 233,
          left: this.props.lefts || 80,
          display: this.props.appear === 0 ? 'none' : 'block'
        }}>{this.props.titles || '技术成果应用率'}</div>
      </div >
    )
  }

  componentDidMount() {
    const me = this;
    const props = me.props;
    const refs = me.refs;
    const width = props.width;
    const height = props.height;
    const container = me.container;

    const style = container.style;
    style.width = width;
    style.height = height;

    const ringDiagram = new BallScale();
    ringDiagram.width = 110;
    ringDiagram.height = 110;
    ringDiagram.speed = 1;
    ringDiagram.peak = 10;
    ringDiagram.value = 0;
    ringDiagram.fontSize = 25;
    ringDiagram.fontColor = ['#b7ffff', '#21d1f5'];
    ringDiagram.stopColor = ['rgba(34,199,252,0.2)', 'rgba(43,254,201,0.6)'];
    ringDiagram.borderWidth = 3;
    ringDiagram.borderStopColor = ['rgba(43,254,201,0.2)', 'rgba(43,254,201,0.8)'];
    refs.ballContainer.appendChild(ringDiagram.domElement);
    me.ringDiagram = ringDiagram;

    const pie = new CirclePie();
    pie.width = 150
    pie.height = 150
    pie.data = 0;
    refs.pieContainer.appendChild(pie.domElement);
    me.pie = pie;
  }

  /**
   * @deprecated
   */
  get width() {
    return this._width;
  }

  /**
   * @deprecated
   */
  set width(value) {
    this._width = value;
  }

  /**
   * @deprecated
   */
  get height() {
    return this._height;
  }

  /**
   * @deprecated
   */
  set height(value) {
    this._height = value;
  }
}

export default NewOldScale;
