import React from 'react';
import "./svg3dtagcloud";

class WordCloud extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  };

  _setData(d) {
    this.lock = true;
    this.setState({ data: d });
  }

  componentDidUpdate() {
    if (!this.lock) { return; }
    this.lock = false;
    let me = this;
    me.settings.entries = me.state.data;
    let svg3DTagCloud = window.SVG3DTagCloud(me.refs.wordCloudRef, me.settings);
  }

  componentDidMount() {
    let me = this;
    // let entries = [
    //   { label: '朔州', url: 'javaScript:();', target: '_top', tooltip: '666' },
    //   { label: '旅游', url: 'javaScript:();', target: '_top' },
    //   { label: '大数据', url: 'javaScript:();', target: '_top' },
    //   { label: '哈哈', url: 'javaScript:();', target: '_top' },
    //   { label: 'nothing', url: 'javaScript:();', target: '_top' },
    //   { label: 'nonono', url: 'javaScript:();', target: '_top' },
    // ];

    me.settings = {
      // entries: entries,
      width: me.props.width,
      height: me.props.height,
      radius: me.props.gridSize,
      radiusMin: 75,
      bgDraw: true,
      bgColor: 'transparent',
      opacityOver: 1.00,
      opacityOut: 0.2,
      opacitySpeed: 5,
      fov: 800,
      speed: 0.1,
      fontFamily: 'Oswald, Arial, sans-serif',
      fontSize: '18',
      fontColor: ['#21f8e1', '#37f7e1', '#fc3a70', '#fad562'],
      fontWeight: 'bold',//bold,normal
      fontStyle: 'normal',//italic
      fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
      fontToUpperCase: true,
      tooltipFontFamily: 'Oswald, Arial, sans-serif',
      tooltipFontSize: '24',
      tooltipFontColor: '#eee',
      tooltipFontWeight: 'normal',//bold,normal
      tooltipFontStyle: 'italic',//italic,normal
      tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
      tooltipFontToUpperCase: false,
      tooltipTextAnchor: 'middle',//middle left
      // tooltipDiffX: 50,
      tooltipDiffY: 40
    };
  }

  render() {
    let me = this;
    return (
      <div ref={"wordCloudRef"} style={{
        position: "absolute",
        top: me.props.top,
        left: me.props.left,
        zIndex: 10
      }} className={"word-cloud"} ></div>
    )
  }
}

export default WordCloud;
