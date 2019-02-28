import React from 'react';

import './turnRoll.css';

class TrunRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.classArr = ['left', 'center', 'right', 'right-rear', 'center-rear', 'left-rear'];
    this.nameArr = ['采收', '种子种苗', '水肥投入', '农药投入', '农资农具', '人工']
  }
  render() {
    return (
      <div style={{ position: 'absolute', left: 90, top: 60 }}>
        {this.changeClassList()}
      </div>
    )
  }
  changeClassList() {
    let classArr = this.classArr;
    let index = this.state.index;
    index %= 6;
    return (
      <ul className={'rollList'} ref={'formList'}>
        {
          classArr.map((t, i) => {
            let num = i - index;
            if (num === -1) {
              num = 5;
            } else if (num === -2) {
              num = 4;
            } else if (num === -3) {
              num = 3;
            }
            else if (num === -4) {
              num = 2;
            }
            else if (num === -5) {
              num = 1;
            }
            return <li className={classArr[num]} key={i}>
              <span style={{
                fontSize: 18,
                color: '#fff',
                display: 'block',
                marginTop: 93,
              }}>{this.nameArr[i]}</span>
            </li>
          })
        }
      </ul>
    )
  }
  componentDidMount() {
    const me = this;
    let index = this.state.index;
    me.timer = setInterval(() => {
      index += 1;
      me.setState({
        index
      });
    }, 2000)

  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
}


export default TrunRoll;