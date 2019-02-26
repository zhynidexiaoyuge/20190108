import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-line-chart';
import Line1 from '../../component/lineCharts/LineChart1';
import Line2 from '../../component/lineCharts/LineChart2';
import Line3 from '../../component/lineCharts/LineChart3';
import Line4 from '../../component/lineCharts/LineChart4';
import Line5 from '../../component/lineCharts/LineChart5';
import Line6 from '../../component/lineCharts/LineChart6';
class Test extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this._tokens = [];
    }
    render(){
        const me = this;
        return (
            <div style={{position:'relative'}}>
                <Panel title={'line-chart1'} top={20}>
                    <Line1 width={800} height={300} ref={'chart1'} gridTop={'20%'} />
                </Panel>
                <Panel title={'line-chart2'} top={360}>
                    <Line2 width={800} height={300} ref={'chart2'} />
                </Panel>
                <Panel title={'line-chart3'} top={700}>
                    <Line3 width={800} height={300} ref={ref => me.chart3 = ref}/>
                </Panel>
                <Panel title={'line-chart4'} top={20} left={900}>
                    <Line4 width={800} height={300} yaxisName={"单位：万人次"}lineColor="#54effb"areaStart="rgba(18,255,255,1)"areaEnd="rgba(18,255,255,0)"arrow={1}dataZoom={1} ref={'chart4'}/>
                </Panel>
                <Panel title={'line-chart5'} top={360} left={900}>
                    <Line5 ref="chart5"width={795}height={240}arrow={1}/>
                </Panel>
                <Panel title={'line-chart6'} top={700} left={900}>
                    <Line6 ref="chart5"width={795}height={340}ref="chart6" title={'人次'} dataZoom={[]}/>
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
        me._tokens.push(api.chart1.send({
        }).then(res => {
            let lineData = {
                xAxis: res.data.nameList,
                series1: res.data.valueList[1],
                series2: res.data.valueList[0]
              }
              me.refs.chart1._setData(lineData)
        }));
        // chart2
        let obj = {
            legend: ['指标1', '指标2', '指标3', '指标4'],
            seriesData1: [100, 350, 55, 77, 88, 23, 90],
            seriesData2: [345, 277, 55, 360, 459, 400, 550],
            seriesData3: [100, 80, 20, 70, 90, 110, 130],
            seriesData4: [349, 600, 550, 334, 230, 550, 610],
            xData: ['专利服务', '信息服务', '会议服务', '微信推广', '项目5', '项目6', '项目7']
          }
          this.refs.chart2._setData(obj);
        // chart3
        me._tokens.push(api.chart3.send({
        }).then(res => {
            try {
                if (res.status !== 200) return;
                const Xdata = [], SeriesData = []
                res.data.map(s => {
                  Xdata.push(s.name);
                  SeriesData.push(s.value)
                });
                const objData = {
                  Xdata: Xdata,
                  SeriesData: SeriesData,
                };
                me.chart3._setData(objData)
              } catch (e) {
                console.error('出现异常', e);
              }
        }));
        // chart4
        me._tokens.push(api.chart4.send({}).then(res => {
            if (!res.success) return;
            let arr = { data: [], dataDate: [] };
            res.data.map(s => {
              arr.data.push(Number((s.touristNum / 10000).toFixed(2)));
              let time = s.dateKey.slice(4).split('');
              time.splice(2, 0, "-");
              time = time.join('');
              arr.dataDate.push(time);
            });
            me.refs.chart4._setData(arr);
          }));
        // chart5
        me._tokens.push(api.chart5.send({}).then(res => {
            if (!res.suc) return;
            let nowTime = res.now;
            let arr = { dataX: [], data: [{ data1: [], data2: [] }] };
            let n;
            res.obj.map((s, i) => {
                arr.dataX.push(`${s.dateKey.slice(-2)}:00`);
                if (Number(s.dateKey) <= Number(nowTime)) {
                arr.data[0].data1.push(s.comfortIndex);
                arr.data[0].data2.push("");
                n = i;
                } else {
                arr.data[0].data1.push("");
                arr.data[0].data2.push(s.comfortIndex);
                }
            });
            arr.name = ['应县塔姆'];
            arr.data[0].data2.splice(n, 1, arr.data[0].data1[n]);
            me.refs.chart5._setData(arr);
          }));
        // chart6
        me._tokens.push(api.chart6.send({}).then(res => {
            let dataArr = []
            dataArr.push({
                name: '男性',
                data: []
            }, {
                name: '女性',
                data: []
            })
            res.data.reverse().map(s => {
                let time = s.time;
                if(s.time.slice(s.time.indexOf(':')+1)==0){
                    time = s.time.slice(0,s.time.indexOf(':'))+':00'
                }
                dataArr[0].data.push({
                dataKey: time,
                value: s.summale
                })
                dataArr[1].data.push({
                dataKey: time,
                value: s.sumfemale
                })
            })
            me.refs.chart6._setData(dataArr);
          }));
    }


}
export default Test;