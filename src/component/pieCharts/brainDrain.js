import React from 'react';
import CirclePie from './CirclePie';

/**
 * 环形占比图
 */
class brainDrain extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {
      data: [
        { 'name': '奎文区', value: '0' },
        { 'name': '全市', value: '0' },
        { 'name': '高密市', value: '0' }
      ]
    };
  }

  _setData(d) {
    this.lock = true;
    this.setState({ data: d });
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return }
    if (!me.state.data) { return }
    me.state.data.forEach(function (t, i) {
      me['pie' + (i + 1)].data = t.value * 100
    })
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
        {
          me.state.data.map((t, i) => {
            return <div key={'zhy' + i} style={{
              position: 'absolute',
              top: 30,
              left: 300 * i + 6,
              width: 150,
              height: 150,
              textAlign: 'center'
            }}>
              <div style={{ width: 150, height: 150, }} ref={'pieContainer' + (i + 1)}></div>
              <div style={{ color: '#fff', fontSize: 18 }}>{t.name}</div>
            </div>
          })
        }
        <div style={{ position: 'absolute', left: 50, top: 220,width:700 }}>
          <div style={{ display: 'inline-block', marginRight: 210, height: 14, fontSize: 14, color: '#fff' }}><span style={{ width: 14, height: 14, border: '1px solid #c1346b', display: 'inline-block', boxSizing: 'border-box', position: 'relative', top: 2, background: 'linear-gradient(rgba(251,54,104,.6), rgba(251,54,104,.1))', marginRight: 10 }}></span>流失最高</div>
          <div style={{ display: 'inline-block', marginRight: 80, height: 14, fontSize: 14, color: '#fff' }}><span style={{ width: 14, height: 14, border: '1px solid #00fffc', display: 'inline-block', boxSizing: 'border-box', position: 'relative', top: 2, background: 'linear-gradient(rgba(0,255,252,.6), rgba(0,255,252,.1))', marginRight: 10 }}></span>平均流失率</div>
          <div style={{ display: 'inline-block', marginLeft: 130, height: 14, fontSize: 14, color: '#fff' }}><span style={{ width: 14, height: 14, border: '1px solid #03cca1', display: 'inline-block', boxSizing: 'border-box', position: 'relative', top: 2, background: 'linear-gradient(rgba(1,255,179,.6), rgba(1,255,179,.1))', marginRight: 10 }}></span>流失最低</div>
        </div>
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

    const pie1 = new CirclePie();
    pie1.width = 150
    pie1.height = 150
    pie1.data = 0;
    pie1.circleColor = ['#eb386c', '#924c88']
    pie1.strokeColor = ['#f2386b', '#f2386b']
    refs.pieContainer1.appendChild(pie1.domElement);
    me.pie1 = pie1;
    const pie2 = new CirclePie();
    pie2.width = 150
    pie2.height = 150
    pie2.data = 0;
    pie2.circleColor = ['#cce134', '#979f1b']
    pie2.strokeColor = ['#e7f326', '#e7f326']
    refs.pieContainer2.appendChild(pie2.domElement);
    me.pie2 = pie2;
    const pie3 = new CirclePie();
    pie3.width = 150
    pie3.height = 150
    pie3.data = 0;
    pie3.circleColor = ['#02d9ad', '#049da3']
    pie3.strokeColor = ['#01ffb3', '#01ffb3']
    refs.pieContainer3.appendChild(pie3.domElement);
    me.pie3 = pie3;
  }
  componentWillUpdate() {
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

export default brainDrain;
