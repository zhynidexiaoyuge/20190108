import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/api/api-radar-chart';
class Test extends Component{
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
                <Panel title={'pie-chart1'} top={20} width={600} height={300}>
                    
                </Panel>
                <Panel title={'pie-chart2'} top={360} width={600} height={300}>
                    
                </Panel>
                <Panel title={'pie-chart3'} top={700} width={600} height={300}>
                    
                </Panel>
                <Panel title={'pie-chart4'} top={20} left={600} width={600} height={300}>
                    
                </Panel>
                <Panel title={'pie-chart5'} top={360} left={600} width={600} height={300}>
                    
                </Panel>
                <Panel title={'pie-chart6'} top={700} left={600} width={600} height={300}>
                    
                </Panel>
            </div>
        )
    }
}
export default Test;