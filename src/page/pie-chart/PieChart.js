import React, { Component } from 'react';
import Panel from '../../component/panel/panel'
class Test extends Component{
    render(){
        return (
            <div style={{position:'relative'}}>
                <Panel title={'测试标题'} top={20}>aaaaa</Panel>
                <Panel title={'测试标题'} top={360}>aaaaa</Panel>
                <Panel title={'测试标题'} top={700}>aaaaa</Panel>
            </div>
        )
    }
}
export default Test;