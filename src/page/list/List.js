import React, { Component } from 'react';
import Panel from '../../component/panel/panel';
import * as api from '../../component/list/list1';
import List1 from '../../component/list/list1';
import NewDynamic from '../../component/list/newDynamic/NewDynamic';
import ProductAdvantage from '../../component/list/productAdvantage/ProductAdvantage';
class Test extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this._tokens = [];
    }
    _clearTokens() {
        this._tokens.forEach((token) => {
          token.cancel();
        });
    }
    render(){
        return (
            <div style={{position:'relative'}}>
                <Panel title={'list1'} top={20} width={740}>
                    <List1 width={580} height={260} left={80}/>
                </Panel>
                <Panel title={'最新动态'} top={360} height={660}>
                    <NewDynamic />
                </Panel>
                <ProductAdvantage width={786} height={640} left={2000} top={380}/>
            </div>
        )
    }
}
export default Test;