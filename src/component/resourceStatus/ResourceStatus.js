import React, {Component} from 'react';
import SummaryResults from '../summaryResults/SummaryResults';

/**
 *海洋人才资源现状
 * */

class ResourceStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: '互联网',
          val: 113.3
        },
        {
          name: '工业设计',
          val: 59.1
        }, {
          name: '大数据',
          val: 68.7
        }, {
          name: '成果转化',
          val: 103.3
        }, {
          name: '科技研发',
          val: 87.3
        }, {
          name: '食品检测',
          val: 60.3
        }, {
          name: '其他',
          val: 33.3
        }
      ],
      unit: '',
      title: '',
      scale: 1
    };

  }

  render() {
    return (
      <div>
        <SummaryResults width={600} height={300}
                        data={this.state.data}
                        unit={this.state.unit}
                        title={this.state.title}
                        scale={this.state.scale}/>
      </div>
    )
  }
}

export default ResourceStatus;
