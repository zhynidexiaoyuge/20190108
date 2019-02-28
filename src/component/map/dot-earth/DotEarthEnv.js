import * as THREE from 'three';
import {InteractiveGroup} from '@jusfoun-vis/threejs-common';
import {
  General3DEnv,
  ParticleSystem
} from '@jusfoun-vis/threejs-chart';
import {
  UA, HP
} from '../../common/MathConstant';
import TWEEN from '@tweenjs/tween.js';
import GeoJSON_world_land_points from './world-land-points.geo.json';
import Image_white_dot from './white-dot.png';

/**
 * 球体投影，将经度、纬度和海拔映射为笛卡尔坐标系的X、Y、Z。
 * @author Molay
 * @param lon 经度
 * @param lat 纬度
 * @param alt 海拔
 * @return {Vector3}
 */
const sphereProjection = function (lon, lat, alt) {
  let local = new THREE.Vector3();
  let phi = lat - 90;
  phi *= UA;
  let theta = 180 - lon;
  theta *= UA;
  local.x = Math.sin(phi) * Math.cos(theta);
  local.y = Math.cos(phi);
  local.z = Math.sin(phi) * Math.sin(theta);
  local.multiplyScalar(alt);
  return local;
};

/**
 * 点状地球3D环境。
 * @author Molay
 */
class DotEarthEnv extends General3DEnv {
  constructor(option) {
    super(option);
    this.initialize();
  }

  _initLights() {
    const me = this;
  }

  _initObjects() {
    const me = this;
    const option = me._option;

    const radius = 55;

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    GeoJSON_world_land_points.features[0].geometry.coordinates.forEach(p => {
      const v = sphereProjection(p[0], p[1], radius);
      positions.push(v.x, v.y, v.z);
    });
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions.length, 3)
      .copyArray(positions));
    const sphere = new ParticleSystem(geometry, {
      size: 1.5,
      color: '#4273b7',
      opacity: 1.0,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      map: new THREE.TextureLoader().load(Image_white_dot)
    });
    const scale = 0.0001;
    sphere.scale.set(scale, scale, scale);
    me._sphere = sphere;
    me.addObject(sphere);
  }

  _initFinally() {
    const me = this;
    const option = me._option;

    const cameraPosition = option.cameraPosition || [
      // 0, 0, 100
      13.730041246393455, 19.144214338120353, 102.59296971391721
    ];
    if (Array.isArray(cameraPosition)) {
      me.camera.position.set.apply(me.camera.position, cameraPosition);
      const controls = me.controls;
      controls.update();
      controls.enabled = false;
    }

    // 0.5：实际绘制区的宽和高为resize设置值的一半，即四分之一绘制面积。
    // 1  ：1比1绘制
    // 2  ：实际绘制区的宽和高为resize设置值的两倍，即四倍绘制面积。Retina屏Mac默认使用此值，因为1个逻辑像素对应4个物理像素。
    // 注意，值越高，显示效果越精细，锯齿越少，但性能耗费呈指数级升高。
    me.renderer.setPixelRatio(1);
  }

  render() {
    const me = this;

    me._sphere.t += 3 * UA;
    me._sphere.rotation.y += -0.1 * UA;
  }

  appear() {
    const me = this;
    if (me._tween) me._tween.stop();
    me._tween = new TWEEN.Tween({t: 0})
      .to({t: 1}, 1000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .delay(200)
      .onUpdate(o => {
        const t = Math.max(o.t, 0.0001);
        me._sphere.scale.set(t, t, t);
      })
      .onComplete(() => {
        me._tween = undefined;
      })
      .start();
  }

  dispose() {
    this.renderer.dispose();
  }
}

export default DotEarthEnv;
