import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-bar-chart';
import BarChart1 from '../../component/barCharts/Barchart1';
import BarChart2 from '../../component/barCharts/Barchart2';
class Test extends Component{
    constructor(props){
        super(props)
        const me = this;
        me.state = {};
        me._tokens = [];
        me.stackBarStyle = {
            width: 1100,
            height: 400,
            position: 'absolute',
            top: 40,
            left: 0
          };
        me.onLineBarStyle = {
            width: 1100,
            height: 400,
            position: 'absolute',
            top: 0,
            left: 0
          };
    }
    render(){
        const me = this;
        return (
            <div style={{position:'relative'}}>
                <Panel title={'bar-chart1'} top={20} width={1200} height={480}>
                    <BarChart2 style={me.stackBarStyle} ref={'barChart2'} unit={''}/>
                </Panel>
                {/* <Panel title={'bar-chart2'} top={360}>
                    
                </Panel> */}
                <Panel title={'bar-chart3'} top={540} width={1200} height={460}>
                    <BarChart1 style={me.onLineBarStyle} unit={'人'} ref={'barChart1'}/>
                </Panel>
                {/* <Panel title={'bar-chart4'} top={20} left={900}>
                    
                </Panel>
                <Panel title={'bar-chart5'} top={360} left={900}>
                    
                </Panel>
                <Panel title={'bar-chart6'} top={700} left={900}>
                    
                </Panel> */}
            </div>
        )
    }
    _clearTokens() {
        this._tokens.forEach((token) => {
          token.cancel();
        });
    }
    componentDidMount(){
        const me = this;
        // chart1
        me._tokens.push(api.barchart1.send({
        }).then(res => {
            let data = [];
            res.data.forEach(s => {
                let temp = {};
                temp.name = s.name;
                temp.value = s.user;
                data.push(temp)
            });
            me.refs.barChart1._setData(data.reverse());
        }));
        // chart2
        me._tokens.push(api.barchart2.send({
        }).then(res => {
            let data = {
                oldP: [],
                newP: []
              };
              let dataX = [];
              res.data.forEach((s, i) => {
                let date = s.t;
                dataX.push(date);
                data.oldP.push({
                  date: date,
                  value: s.his_user
                });
                data.newP.push({
                  date: date,
                  value: s.new_user
                });
              });
            me.refs.barChart2._setData({
                name: ['新用户', '老用户'],
                data,
                dataX
              });
        }));
    }
}
export default Test;