import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import { Menu ,Button ,Icon} from 'antd';
import HomePage from '../page/home-page/HomePage';
import PieChart from '../page/pie-chart/PieChart';
import BarChart from '../page/bar-chart/BarChart';
import LineChart from '../page/line-chart/LineChart';
import RadarChart from '../page/radar-chart/RadarChart';
import List from '../page/list/List';
import D3 from '../page/d3/d3';
// 星星
import RunBall from '../component/run-abll/run-ball';
import './router.css'

const SubMenu = Menu.SubMenu;

class NavLinks extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
            name:'homePage'
        }
        this.sessionStorage = window.sessionStorage;
        this.sessionStorage.setItem('name',this.state.name)
    }
    toggleCollapsed = () => {
        const me = this;
        if(me.state.collapsed===false){
            me.refs['menu-container'].style.width = 80+'px';
            me.refs['router-container'].style.width = 2920+'px';
        }else{
            me.refs['router-container'].style.width = 2800+'px';
            me.refs['menu-container'].style.width = 200+'px';
        }
        this.setState({
          collapsed: !me.state.collapsed,
        });
    }
    _navClick(t){
        this.setState({
            name: t,
        });
    }
    render(){
        return (
            <div style={{width:3000,height:1080}}>
                <div className="menu-container" ref="menu-container">
                    <Menu className="menu-List" defaultSelectedKeys={['0']} theme="dark" defaultOpenKeys={['sub1']}mode="inline"inlineCollapsed={this.state.collapsed}>
                        <SubMenu key="sub1" title={<span><Icon type="folder" /><span>echarts</span></span>}>
                            <Menu.Item key="1" className={this.state.name=='pieChart'? 'itemSelected': ''} onClick={this._navClick.bind(this,'pieChart')}>
                                <Icon type="pie-chart" />
                                <span><NavLink exact to={'/pieChart'}>pieChart</NavLink></span>
                            </Menu.Item>
                            <Menu.Item key="2" className={this.state.name=='barChart'? 'itemSelected': ''} onClick={this._navClick.bind(this,'barChart')}>
                                <Icon type="bar-chart" />
                                <span><NavLink exact to={'/barChart'}>barChart</NavLink></span>
                            </Menu.Item>
                            <Menu.Item key="3" className={this.state.name=='lineChart'? 'itemSelected': ''} onClick={this._navClick.bind(this,'lineChart')}>
                                <Icon type="line-chart" />
                                <span><NavLink exact to={'/lineChart'}>lineChart</NavLink></span>
                            </Menu.Item>
                            <Menu.Item key="4" className={this.state.name=='radarChart'? 'itemSelected': ''} onClick={this._navClick.bind(this,'radarChart')}>
                                <Icon type="radar-chart" />
                                <span><NavLink exact to={'/radarChart'}>radarChart</NavLink></span>
                            </Menu.Item>
                        </SubMenu>
                        {/* <SubMenu key="sub2" title={<span><Icon type="folder" /><span>d3</span></span>}>
                            
                        </SubMenu> */}
                        <Menu.Item key="2" className={this.state.name=='d3'? 'itemSelected': ''} onClick={this._navClick.bind(this,'d3')}>
                            <Icon type="folder" />
                            <span><NavLink exact to={'/d3'}>d3</NavLink></span>
                        </Menu.Item>
                        <Menu.Item key="3" className={this.state.name=='list'? 'itemSelected': ''} onClick={this._navClick.bind(this,'list')}>
                            <Icon type="ordered-list" />
                            <span><NavLink exact to={'/list'}>list</NavLink></span>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="router-container" ref="router-container">
                    <div className="toolbar">
                        <Button type="primary" onClick={this.toggleCollapsed} className="button-toggle">
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                        <Button type="primary" onClick={this._navClick.bind(this,'homePage')} className="button-home">
                            <NavLink exact to={'/'}><Icon type="home" /></NavLink>
                        </Button>
                    </div>
                    <RunBall />
                    <div>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/pieChart" component={PieChart}></Route>
                        <Route path="/barChart" component={BarChart}></Route>
                        <Route path="/lineChart" component={LineChart}></Route>
                        <Route path="/radarChart" component={RadarChart}></Route>
                        <Route path="/list" component={List}></Route>
                        <Route path="/d3" component={D3}></Route>
                    </div>
                </div>
            </div> 
        )
    }
    componentWillMount(){
        let reg = /(.+\/)/g;
        console.log( window.location.href.match(reg)[0] )
        // let url = window.location.href.match(reg);
        // let urlName = window.location.href.slice(window.location.href.match(reg)[0].length,window.location.href.length-1);
        // // console.log()
        // if(window.location.href!=='http://localhost:3000/'){
        //     window.location.href="http://localhost:3000/"
        // }
    }
}
export default NavLinks;