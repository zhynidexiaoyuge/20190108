import React, { Component } from 'react';
import ResizeManager from './component/common/ResizeManager';
import {HashRouter} from 'react-router-dom';
import Routes from './router/Router';
import './App.css';


class App extends Component {
  render() {
    let me = this;
    const width = 3000;
    const height = 1080;
    const mode = window.resizeMode || ResizeManager.MODE_DEBUG;
    return (
      <HashRouter>
        <div className="App">
          {/* 按住shift+鼠标双击改变缩放级别 */}
          <ResizeManager fullWidth={width} fullHeight={height} mode={mode}></ResizeManager>
          <Routes />
        </div>
      </HashRouter>
    );
  }
}

export default App;
