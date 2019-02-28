import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-map-chart';
import WFMap from '../../component/map/weifang-map/weifangMap';
import ChinaMap from '../../component/map/china-map/chinaMap';
import WorldMap from '../../component/map/world-map/worldMap';
/*点状地球效果*/
import DotEarth from '../../component/map/dot-earth/DotEarth';
class Map extends Component{
    constructor(props){
        super(props)
        const me = this;
        me.state = {};
        me._tokens = [];
    }
    _clearTokens() {
        this._tokens.forEach((token) => {
          token.cancel();
        });
    }
    render(){
        return (
            <div style={{position:'relative'}}>
                <Panel title={'潍坊地图'} top={20} width={600} height={300}>
                    <WFMap width={600} height={280} ref="WFMap" />
                </Panel>
                <Panel title={'中国地图'} top={360} width={600} height={300}>
                    <ChinaMap style={{width: '600px',height: '260px'}}/>
                </Panel>
                <Panel title={'中国地图'} top={700} width={600} height={300}>
                    <WorldMap style={{width: '600px',height: '260px'}} />
                </Panel>
                <DotEarth style={{ position: 'absolute',left:'300px', transform: 'scale(1.2)',}} />
            </div>
        )
    }
    componentDidMount(){
        const me = this;
        /* map1 */
        me._tokens.push(api.map1.send({
        }).then(res => {
            let data = res.data.map((t, i) => {
                return {
                  name: t.name,
                  value: t.value,
                  label: { normal: { show: true } }
                }
            })
            me.refs.WFMap._setData(data)
        }));
    }
}
export default Map;