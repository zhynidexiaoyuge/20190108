import React, { Component } from 'react';
import './ProductAdvantage.css';

/**
 * 产品优势
 * */

class ProductAdvantage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.classes = ['left', 'center', 'right'];
  }

  render() {
    const classes = this.classes;
    return (
      <div style={{ position: 'absolute', left:this.props.left, top: this.props.top}}>
        {this.changeClass(0)}
      </div>
    )
  }

  changeClass() {
    const me = this;
    const classes = this.classes;
    let index = this.state.index;
    index %= 3;
    return (
      <ul className={'carouselList'} ref={'formList'}>
        {
          classes.map((t, i) => {
            let num = i - index;
            if (num == -1) {
              num = 2;
            } else if (num == -2) {
              num = 1;
            }
            return <li className={classes[num]} key={i} onMouseOver={me.stop.bind(this)} onMouseOut={me.move.bind(this)}></li>
          })
        }
      </ul>
    )
  }

  stop() {
    clearInterval(this.timer);
  }

  move() {
    this.componentDidMount();
  }

  componentDidMount() {
    const me = this;
    let index = this.state.index;
    me.timer = setInterval(() => {
      index += 1;
      me.setState({
        index
      });
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default ProductAdvantage;