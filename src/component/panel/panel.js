import React, { Component } from 'react';
import './panel.css';
class Panel extends Component{
    render(){
        const me = this;
        return (
            <div style={{
                position:'absolute',
                width:me.props.width||900,
                height:me.props.height||320,
                left:me.props.left||20,
                top:me.props.top||0
            }} className="panel-box">
                <div className="panel-border-top"></div>
                <div className="panel-border-bottom"></div>
                <h3 className="panel-title">{this.props.title}</h3>
                <div className="panel-children">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Panel;