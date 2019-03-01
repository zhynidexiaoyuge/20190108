import React, { Component } from 'react';
import './NewDynamic.css';
import img from './news.png';

/**
 * 最新动态
 * */

class NewDynamic extends Component {
  constructor() {
    super();
    this.state = {
      data: [{
        img: img,
        title: '动态消息：微医拟明年赴港IPO 计划融资5亿美元',
        content: '9月18日，工信部公布了2018年“创客中国”创新创业大赛200强名单，我委推荐的五个创新创业项目首次入围大赛200强，是今年西北地区参赛项目入围最多的省份'
      }, {
        img: img,
        title: '动态消息：微医拟明年赴港IPO 计划融资5亿美元',
        content: '9月18日，工信部公布了2018年“创客中国”创新创业大赛200强名单，我委推荐的五个创新创业项目首次入围大赛200强，是今年西北地区参赛项目入围最多的省份'
      }, {
        img: img,
        title: '动态消息：微医拟明年赴港IPO 计划融资5亿美元',
        content: '9月18日，工信部公布了2018年“创客中国”创新创业大赛200强名单，我委推荐的五个创新创业项目首次入围大赛200强，是今年西北地区参赛项目入围最多的省份'
      }, {
        img: img,
        title: '动态消息：微医拟明年赴港IPO 计划融资5亿美元',
        content: '9月18日，工信部公布了2018年“创客中国”创新创业大赛200强名单，我委推荐的五个创新创业项目首次入围大赛200强，是今年西北地区参赛项目入围最多的省份'
      }]
    }
  }

  render() {
    const datas = this.state.data;
    return (
      <div>
        <ul className={'newsList'}>
          {
            datas.map((t, i) => {
              return (
                <li key={i}>
                  <div><img src={t.img} alt="" /></div>
                  <div>
                    <h3>{t.title}</h3>
                    <p className={'font'}>{t.content}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default NewDynamic;
