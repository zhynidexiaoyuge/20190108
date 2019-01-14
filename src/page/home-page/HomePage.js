import React, { Component } from 'react';
import './homePage.css';
import Panel from '../../component/panel/panel'
class HomePage extends Component{
    render(){
        return (
            <div style={{position:'relative'}} className="homePage-Box">
                <Panel title={'测试标题'} top={20}>aaaaa</Panel>
                <Panel title={'测试标题'} top={360}>aaaaa</Panel>
                <Panel title={'测试标题'} top={700}>aaaaa</Panel>
            </div>
        )
    }
}
export default HomePage;