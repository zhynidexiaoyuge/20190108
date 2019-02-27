import React from 'react';
import bgs from './bgs.png';

class Scalltr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: '第一产业', value: 20 },
        { name: '第二产业', value: 30 },
        { name: '第三产业', value: 60 }
      ]
    };
  }
  _addList() {
    const me = this;
    return me.state.data.map((s, i) => {
      return (
        <li key={i} onMouseOver={this.appear.bind(this,s,i)} onMouseOut={this.disappear.bind(this,s,i)} style={{position:'absolute',left:90+i*20+'px',top:i*(35)+'px',width:'86px',height:'27px'}}>
          <span ref={'span'+i} style={{textAlign:'center',color:'#fff',fontSize:'16px',lineHeight:'30px',display:'none',position:'absolute',background:'#0c1849',borderRadius:'4px',zIndex:9,top:'-32px',border:'1px solid #10f2fa',width:'90px',height:'30px'}}>
            {s.value+'个'}
          </span>

        </li>
      )
    })
  }

  appear(v,i){
    let me = this;
    for(let j = 0;j < 3;j++){
      me.refs['span'+j].style.display = 'none';
    }
    me.refs['span'+i].style.display = 'block';

  }
  disappear(v,i){
    let me = this;
    for(let j = 0;j < 3;j++){
      me.refs['span'+j].style.display = 'none';
    }

  }
  render() {
    return (
      <div style={{
        position: 'absolute',
        width:'213px',
        height:'118px',
        left: '22px',
        top:'122px',
        background:`url(${bgs})`
      }}>
        {
          this._addList()
        }
      </div>
    )
  }
}
export default Scalltr;