import React, { Component } from 'react';
// 星星
import RunBall from '../../component/run-abll/run-ball';
import './homePage.css';
class HomePage extends Component{
    render(){
        return (
            <div style={{position:'relative'}} className="homePage-Box">
                <div className="zhy_cirlceBg"></div>
                <RunBall />
            </div>
        )
    }
}
export default HomePage;