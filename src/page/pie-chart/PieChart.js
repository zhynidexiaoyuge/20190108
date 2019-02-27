import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-pie-chart';
import Pie1 from '../../component/pieCharts/pieChart1';
import Pie2 from '../../component/pieCharts/pieChart2';
import Pie3 from '../../component/pieCharts/pieChart3';
import Pie4 from '../../component/pieCharts/pieChart4';
import Pie5 from '../../component/pieCharts/pieChart5';
import SummaryResults from '../../component/resourceStatus/ResourceStatus';
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
                <Panel title={'pie-chart5'} top={700} left={600} width={600} height={300}>
                    <Pie5 width={300} height={300} left={120} id={1} title={'创业指数'} startColor={'rgba(236,56,108,.3)'} endColor={'rgba(236,56,108,1)'} ref='pieChart5' />
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
            console.log(res)
            me.refs.pieChart5._setData(Number(res.data[0].value * 100).toFixed(1))
        }));
    }
}
export default Test;