import React, {Component} from 'react';
import DotEarthEnv from './DotEarthEnv';

/**
 * 点状地球效果示例。
 * @author Molay
 */
class DotEarth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const me = this;
    return (
      <div ref={ref => me.domElement = ref} style={this.props.style}/>
    );
  }

  componentDidMount() {
    const me = this;
    const env = new DotEarthEnv();
    if (this.props.psz) {
      env.resize((1024 * 2) * 1.35, (768 + 200) * 1.35);
    }
    else {
      env.resize(1024 * 2, 768 + 200);
    }
    me.domElement.appendChild(env.domElement);
    env.startRender();
    me._env = env;

    env.appear();
  }

  componentWillUnmount() {
    const me = this;
    const env = me._env;
    if (env) {
      env.stopRender();
      env.dispose();
    }
  }
}

export default DotEarth;
