/// <reference path='../types/global.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SlideCaptcha from './components/SlideCaptcha';
import axios from 'axios';
// import * as arrow from './assets/img/arrow.svg';
// import * as arrow_white from './assets/img/arrow_white.svg';
// import * as cross from './assets/img/cross.svg';
// render react DOM

interface IState {
  puzzleUrl: string;
  bgUrl: string;
  id: string;
}

class Demo extends React.Component<null, IState> {
  constructor(props) {
    super(props);
    this.state = {
      puzzleUrl: '',
      bgUrl: '',
      id: '',
    };
  }

  componentDidMount() {
    this.getPuzzleInfo().then((res) => {
      this.setState({
        id: res.id,
        puzzleUrl: res.puzzleUrl,
        bgUrl: res.bgUrl,
      });
    });
  }

  getPuzzleInfo = async () => {
    return await axios({
      method: 'post',
      baseURL: 'http://localhost:5000',
      url: '/getPuzzle',
    }).then((res) => {
      return res.data;
    });
  }

  resultCallback = (validateValue: number, validatedSuccess: (callback: () => any) => void, validatedFail?: (callback: () => any) => void) => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:5000',
      url: '/validate',
      data: { id: this.state.id, distance: validateValue },
    }).then((res) => {
      const data = res.data;
      const code = data.code;
      if (code === 100) {
        validatedSuccess(() => {
          alert('验证成功，此处可以验证成功代码');
        });

      } else {
        validatedFail(() => {
          alert('验证失败，处可以处理验证失败代码');
        });
      }
    }).catch(() => {
      console.log('报错啦');
    });
  }

  render() {
    return(
      <SlideCaptcha
        puzzleUrl={this.state.puzzleUrl}
        bgUrl={this.state.bgUrl}
        onRequest={this.resultCallback}
        containerClassName="test"
        tipsClassName="testTips"
        tipsStyle={{color: '#444444'}}
        style={{ marginTop: '200px' }}
        tipsText="请向右滑动滑块填充拼图"
        robotValidate={{
          offsetY: 5,
          handler: ():void => {
            alert('错误，您并非人类');
          },
        }}
      />
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root'),
);
