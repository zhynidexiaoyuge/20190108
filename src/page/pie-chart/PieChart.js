import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-pie-chart';
import Pie1 from '../../component/pieCharts/pieChart1';
import Pie2 from '../../component/pieCharts/pieChart2';
import Pie3 from '../../component/pieCharts/pieChart3';
import Pie4 from '../../component/pieCharts/pieChart4';
import Pie5 from '../../component/pieCharts/pieChart5';
import SummaryResults from '../../component/resourceStatus/ResourceStatus';
import BrainDrain from '../../component/pieCharts/brainDrain';
import Circles from '../../component/pieCharts/circle';
import Pie8 from '../../component/pieCharts/pieChart8';
import NewOldScale from '../../component/run-abll/NewOldScale';
import TrunRoll from '../../component/trunRoll/trunRoll';

class Test extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this._tokens = [];
    }
    render(){
        return (
            <div style={{position:'relative'}}>
                <Panel title={'pie-chart1'} top={20} width={600} height={300}>
                    <Pie1 ref="pieChart1" style={{width: 600,height: 260}} />
                </Panel>
                <Panel title={'pie-chart2'} top={360} width={600} height={300}>
                    <Pie2 ref="pieChart2" width={600} height={260} />
                </Panel>
                <Panel title={'测试标题'} top={700} width={600} height={300}>
                    <SummaryResults />
                </Panel>
                <Panel title={'pie-chart3'} top={20} left={600} width={600} height={300}>
                    <Pie3 ref="pieChart3" width={600} height={260} left={-26} top={0} location={'60%'} />
                </Panel>
                <Panel title={'pie-chart4'} top={360} left={600} width={600} height={300}>
                    <Pie4 ref="pieChart4" top={40} left={140} ref="pieChart4"/>
                </Panel>
                <Panel title={'pie-chart5'} top={20} left={1200} width={1000} height={300}>
                    <Pie5 width={300} height={300} left={40} id={1} title={'创业指数'} startColor={'rgba(236,56,108,.3)'} endColor={'rgba(236,56,108,1)'} ref='gauge1' />
                    <Pie5 width={300} height={300} left={340} id={2} title={'就业指导'} startColor={'rgba(250,243,60,.3)'} endColor={'rgba(250,243,60,1)'} ref='gauge2' />
                    <Pie5 width={300} height={300} left={640} id={3} title={'就业难度指数'} startColor={'rgba(1,254,179,.3)'} endColor={'rgba(1,254,179,1)'} ref='gauge3' />
                </Panel>
                <Panel title={'pie-chart6'} top={360} left={1200} width={1000} height={300}>
                    <BrainDrain width={600} height={260} left={110} ref='brainDrain' />
                </Panel>
                <Panel title={'pie-chart7'} top={700} left={1200} width={1000} height={300}>
                    <Circles width={150} height={180} left={130} ref={'circle-one'} id={'circle-one'} startColor={'rgba(237,56,108,1)'} endColor={'rgba(237,56,108,.1)'} leftText={170} />
                    <Circles width={150} height={180} left={420} ref={'circle-two'} id={'circle-two'} startColor={'rgba(2,213,163,1)'} endColor={'rgba(2,213,163,.1)'} leftText={460} />
                    <Circles width={150} height={180} left={720} ref={'circle-three'} id={'circle-three'} startColor={'rgba(206,204,77,1)'} endColor={'rgba(206,204,77,.1)'} leftText={750} />
                </Panel>
                <Panel title={'pie-chart8'} top={700} left={600} width={600} height={300}>
                    <Pie8 ref={'pieChart8'} width={500} height={240} />
                </Panel>
                <Panel title={'pie-chart9'} top={20} left={2200} width={600} height={300}>
                    <NewOldScale lefts={63} width={166} height={294} left={14} top={0} ref={'year17'} titles={'2017'}/>
                    <NewOldScale lefts={63} width={166} height={294} left={214} top={0} ref={'year18'} titles={'2018'}/>
                    <NewOldScale lefts={63} width={166} height={294} left={414} top={0} ref={'year19'} titles={'2019'}/>
                </Panel>
                <Panel title={'TrunRoll'} top={360} left={2200} width={600} height={300}>
                    <TrunRoll/>  
                </Panel>
                <Panel title={'RandomBubble'} top={700} left={2200} width={600} height={300}>
                    
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
        /* chart1 */
        me._tokens.push(api.pieChart1.send({
        }).then(res => {
            let roseChartData = res.data.map((t, i) => {
                return {
                  name: t.name,
                  value: t.value
                }
            })
            me.refs.pieChart1._setData(roseChartData)
        }));
        /* chart2 */
        me._tokens.push(api.pieChart2.send({
        }).then(res => {
            let hotelPieData = res.data.map((t, i) => {
                return {
                  name: t.name,
                  value: t.value
                }
            })
            me.refs.pieChart2._setData(hotelPieData)
        }));
        /* chart3 */
        me._tokens.push(api.pieChart3.send({
        }).then(res => {
            try {
                const data = res.data;
                let arrSort = data.sort(function (a, b) {
                  return b.showvalue - a.showvalue
                })
                me.refs.pieChart3._setData(arrSort);
              } catch (e) {
                console.error('出现异常', e);
              }
        }));
         /* chart4 */
         me._tokens.push(api.pieChart4.send({
        }).then(res => {
            me.refs.pieChart4._setData(res.data.sort(function (a, b) { return a.value - b.value }))
        }));
        /* chart5 */
        me._tokens.push(api.pieChart5.send({
        }).then(res => {
            me.refs.gauge1._setData(Number(res.data[0].value * 100).toFixed(1))
            me.refs.gauge2._setData(Number(res.data[1].value * 100).toFixed(1))
            me.refs.gauge3._setData(Number(res.data[2].value * 100).toFixed(1))
        }));
        /* chart6 */
        me._tokens.push(api.pieChart6.send({}).then(res => {
          me.refs.brainDrain._setData(res.data)
        }));
        /* chart7 */
        me._tokens.push(api.pieChart7.send({
        }).then(res => {
          let datas = res.data;
          this.refs['circle-one']._setData(datas[0])
          this.refs['circle-two']._setData(datas[1])
          this.refs['circle-three']._setData(datas[2]);
        }));
        /* chart8 */
        me.refs.pieChart8.setData({
            data: [10, 20, 30, 50, 30, 20, 10]
        });
        /* 水球 */
        this.refs.year17._setData(42);
        this.refs.year18._setData(52);
        this.refs.year19._setData(72);
    }
}
export default Test;