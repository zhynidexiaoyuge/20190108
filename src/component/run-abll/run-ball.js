import React from 'react';
import * as THREE from 'three';


import starBg from './star.png';

import starWrapperBg from './star-bg.png';

/**
 * @author
 * 市场监测
 */

class EarthBall extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {};

  }

  createStar() {
    let me = this;
    let starBox = me.refs.starSky;
    let starDiv = document.createElement('div');
    starDiv.style.width = '9px';
    starDiv.style.height = '9px';
    starDiv.style.position = 'relative';
    starDiv.style.left = Math.floor(starBox.clientWidth * Math.random()) + 'px';
    starDiv.style.top = Math.floor(starBox.clientHeight * Math.random()) + 'px';
    starDiv.style.overflow = 'hidden';
    starBox.appendChild(starDiv);
    let ostar = document.createElement('img');
    ostar.style.width = '49px';
    ostar.style.height = '7px';
    ostar.src = starBg;
    ostar.style.position = 'absolute';
    ostar.style.top = '0';
    starDiv.appendChild(ostar);
    me.play(ostar);
  }

  play(ele) {
    let i = Math.floor(Math.random() * 7);  //为了使星星不同时闪烁，设置随机值
    this.timer = setInterval(function () {     //每100ms执行一次匿名方法
      if (i < 7) {
        ele.style.left = -i * 7 + 'px';
        i++;
      } else {
        i = 0;
      }
    }, 600);
  }

  render() {
    const me = this;
    return (
      <div className="earth-wrapper" style={{position: 'absolute',}}>
        <div className="earth-bg">

        </div>
        <div ref={'starSky'}
             style={{
               width: '2800px',
               height: '1080px',
               position: 'absolute',
               top: '-160px',
               left: '0px',
               background: 'url(' + starWrapperBg + ') no-repeat center'
             }}>
        </div>
      </div>
    );
  }


  componentDidMount() {
    let me = this;
    let wrapper = document.getElementsByClassName('earth-wrapper')[0];
    let _width = wrapper.clientWidth;
    let _height = wrapper.clientHeight;
    let  lastDate = new Date();

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, _width / _height, 1, 5000);
    camera.position.set(0, 0, 20);
    scene.add(camera);

    var geometry = new THREE.SphereGeometry(5, 20, 22);
    var material = new THREE.MeshBasicMaterial({
      color: 0xa3d2e5,
      wireframe: true
    });

   let  sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    let renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(_width, _height);
    wrapper.appendChild(renderer.domElement);


    animate();

    function animate() {
      var now = new Date();
      var delay = now - lastDate;
      lastDate = now;

      sphere.rotation.y += delay * 0.0008;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

    }

    //星星闪烁
    for (let i = 0; i < 50; i++) {
      me.createStar()
    }
  }

  componentWillUnmount() {
    let me = this;
    clearInterval(me.timer);
  }
}

export default EarthBall;
