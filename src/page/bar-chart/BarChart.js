import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-bar-chart';
import BarChart1 from '../../component/barCharts/Barchart1';
import BarChart2 from '../../component/barCharts/Barchart2';
import BarChart3 from '../../component/barCharts/Barchart3';
import BarChart4 from '../../component/barCharts/Barchart4';
import BarChart5 from '../../component/barCharts/Barchart5';
import BarChart6 from '../../component/barCharts/Barchart6';
import BarChart7 from '../../component/barCharts/Barchart7';
import BarChart8 from '../../component/barCharts/Barchart8';
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
            left: 0,
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
                <Panel title={'bar-chart2'} top={540} width={1200} height={460}>
                    <BarChart1 style={me.onLineBarStyle} unit={'人'} ref={'barChart1'}/>
                </Panel>
                <Panel title={'bar-chart3'} top={20} left={1200} width={700}>
                    <BarChart3 width={700} height={280} ref="barChart3" />
                </Panel>
                <Panel title={'bar-chart4'} top={350} left={1200} width={700}>
                    <BarChart4 width={700} height={280} ref="barChart4" />
                </Panel>
                <Panel title={'bar-chart5'} top={680} left={1200} width={700}>
                    <BarChart5 width={700} height={280} ref="barChart5" />
                </Panel>
                <Panel title={'bar-chart6'} top={20} left={2000} width={700}>
                    <BarChart6 left={40} width={600} height={300} ref="barChart6" />
                </Panel>
                <Panel title={'bar-chart7'} top={350} left={2000} width={700}>
                    <BarChart7 width={600} height={200} top={54} content={'机器人'} conTop={120} lineTop={104} ref={'barChart7'} />
                </Panel>
                <Panel title={'bar-chart8'} top={680} left={2000} width={700}>
                    <BarChart8  ref={'barChart8'} style={{ width: '600px', height: '232px', zIndex: 1, position: 'absolute' }}  />
                </Panel>
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

        // chart3
        me._tokens.push(api.barchart3.send({
        }).then(res => {
            me.refs.barChart3._setData(res.data)
        }));
        // chart4
        me._tokens.push(api.barchart4.send({
        }).then(res => {
            let ShapeBarData = {
                xAxis: res.data.map((t) => { return t.name }),
                series: res.data.map((t) => { return t.value })
              }
              me.refs.barChart4._setData(ShapeBarData)
        }));
         // chart5
        me._tokens.push(api.barchart5.send({
        }).then(res => {
            me.refs.barChart5._setData(res.data)
        }));
        // chart6
        me._tokens.push(api.barchart6.send({
        }).then(res => {
            let seriesName = [], seriesData = []
            res.data.sort(function (a, b) {
                return a.value - b.value
            }).map((s, i) => {
                seriesName.push(s.name);
                seriesData.push(s.value)
            })
            let data = {
                seriesName: seriesName,
                seriesData: seriesData
            }
            me.refs.barChart6._setData(data)
        }));
        // chart7
        me._tokens.push(api.barchart7.send({
        }).then(res => {
            let valueTlist = Object.values(res.data.valueTList[0]);//传统行业
            let xData = res.data.yearsList;
            let valueNlist = Object.values(res.data.valueDList[0])//新型行业
            //机器人
            me.refs.barChart7._setData({
                xData: xData,
                series1: valueNlist[0][0],
                series2: valueNlist[0][1],
                type: valueNlist[0][2]
            })
        }));
         // chart8
        me._tokens.push(api.barchart8.send({
        }).then(res => {
            let xAxisData = [], seriesData = [];
            res.data.map(item => {
                xAxisData.push(item.scenicName);
                seriesData.push(item.rate.slice(0, -1))
            });
            let initData = {
                xAxisData: xAxisData,
                seriesData: seriesData,
                subtext: "",
                times: true
            };
            
            me.refs.barChart8._setData(initData)
        }));
        
    }
}
export default Test;