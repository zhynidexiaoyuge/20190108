import React from 'react';
import './list1.css'

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[
          '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；',
          '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；',
          '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；',
            '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；',
            '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；南濒黄浦江、吴淞江，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。',
            '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。',
            '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；南濒黄浦江、吴淞江，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。',
            '虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；南濒黄浦江、吴淞江，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与闸北区毗连；南濒黄浦江、吴淞江，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。虹口区，上海市下辖区，位于上海市区北部偏东；东临大连路、大连西路、密云路、邯郸路、逸仙路，与杨浦区接壤；西靠河南北路、罗浮路、淞沪铁路、西宝兴路、北宝兴路、俞泾浦、江杨南路，与浦东新区和黄浦区隔江相望；北至三门路稍北的农机路，与宝山区相接。'
        ]
    }
  }
  componentDidMount() {
    const me = this;
    me.oLi = me.refs['wrapUl'].children;
    const _nodeP = this.refs.wrapUl;
    Array.from(_nodeP.children).forEach((t,k)=>{
        let el = t.querySelector('p');
        let s = this.state.data[k];
        let n = el.offsetHeight;
        for (let i = 0; i < s.length; i++) {
          el.innerHTML = k+1+'、'+s.substr(0, i);
          if (n < el.scrollHeight - 4) {
            el.style.overflow = 'hidden';
            el.innerHTML = k+1+'、'+s.substr(0, i - 3) + '...';
            break;
          }
        }
    })
    
    
  }
  _hover(i){
    this.oLi[i].classList = 'opacity';
    // console.log( this.oLi[i].querySelector('span').style.top )
    this.oLi[i].querySelector('span').style.top = -((this.oLi[i].querySelector('span').offsetHeight)/2-37)+'px';
    this.oLi[i].querySelector('span').style.left= -20+'px';
    // console.log( this.oLi[i].querySelector('span').offsetHeight )
  }
  _out(i){
    this.oLi[i].className = ''
  }

  render() {
      const me = this;
    return (
      <div style={{
        position:'absolute',
        width:me.props.width||0,
        height:me.props.height||0,
        top:me.props.top||0,
        left:me.props.left||0
      }} className="list-Box">
        <ul ref="wrapUl" className="wrapUl listscroll">
            {
                me.state.data.map((t,i)=>{
                let inner = (i+1)+"、";
                return <li key={'zhy'+i} onMouseOver={me._hover.bind(me,i)} onMouseOut={me._out.bind(me,i)} className=""><p></p><span>{inner+t}</span></li>
                })
            }
        </ul>
      </div >
    )
  }
}
export default List;