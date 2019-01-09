import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import { Menu ,Button ,Icon} from 'antd';
import HomePage from '../page/home-page/HomePage';
import PieChart from '../page/pie-chart/PieChart';
import BarChart from '../page/bar-chart/BarChart';
import LineChart from '../page/line-chart/LineChart';
import RadarChart from '../page/radar-chart/RadarChart';
import './router.css'

const SubMenu = Menu.SubMenu;

class NavLinks extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        const me = this;
        if(me.state.collapsed===false){
            me.refs['menu-container'].style.width = 80+'px';
            me.refs['router-container'].style.width = 1840+'px';
        }else{
            me.refs['router-container'].style.width = 1720+'px';
            me.refs['menu-container'].style.width = 200+'px';
        }
        
        this.setState({
          collapsed: !me.state.collapsed,
        });
    }
    render(){
        return (
            <div style={{width:1920,height:1080}}>
                <div className="menu-container" ref="menu-container">
                    <Menu className="menu-List" defaultSelectedKeys={['0']} theme="dark" defaultOpenKeys={['sub1']}mode="inline"inlineCollapsed={this.state.collapsed}>
                        {/* <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span><NavLink exact to={'/pieChart'}>Option 1</NavLink></span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span><NavLink exact to={'/'}>Option 2</NavLink></span>
                        </Menu.Item> */}
                        <SubMenu key="sub1" title={<span><Icon type="folder-open" /><span>echarts</span></span>}>
                            <Menu.Item key="1">
                                <Icon type="pie-chart" />
                                <span><NavLink exact to={'/pieChart'}>pieChart</NavLink></span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="bar-chart" />
                                <span><NavLink exact to={'/barChart'}>barChart</NavLink></span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="line-chart" />
                                <span><NavLink exact to={'/lineChart'}>lineChart</NavLink></span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="radar-chart" />
                                <span><NavLink exact to={'/radarChart'}>radarChart</NavLink></span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="folder-open" /><span>d3</span></span>}>
                            
                        </SubMenu>
                    </Menu>
                </div>
                <div className="router-container" ref="router-container">
                    <div className="toolbar">
                        <Button type="primary" onClick={this.toggleCollapsed} className="button-toggle">
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                    </div>
                    <div>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/pieChart" component={PieChart}></Route>
                        <Route path="/barChart" component={BarChart}></Route>
                        <Route path="/lineChart" component={LineChart}></Route>
                        <Route path="/radarChart" component={RadarChart}></Route>
                    </div>
                </div>
            </div> 
        )
    }
}
export default NavLinks;