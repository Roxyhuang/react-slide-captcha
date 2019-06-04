/// <reference path='../types/global.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SlideCaptcha from './components/SlideCaptcha';
import { getPuzzle, validate }  from '../mock/mock';
enum positionStringMap {
  top =  'top',
  bottom = 'bottom',
}

interface IState {
  puzzleUrl: string;
  bgUrl: string;
  id: string;
  isLoading: boolean;
}

class Demo extends React.Component<null, IState> {
  constructor(props) {
    super(props);
    this.state = {
      puzzleUrl: '',
      bgUrl: '',
      id: '',
      isLoading: false,
    };
  }

  private aaa = null;

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
    return await getPuzzle().then((res) => {
      const data = JSON.parse(res);
      return data;
    });
  };

  handleGetPuzzleInfo =  () => {
    this.setState({
      isLoading: true,
    });
    this.getPuzzleInfo().then((res) => {
      this.setState({
        id: res.id,
        puzzleUrl: res.puzzleUrl,
        bgUrl: res.bgUrl,
        isLoading: false,
      });
    });
  }

  resultCallback = (
    validateValue: number,
    validatedSuccess?: (callback: () => any) => void,
    validatedFail?: (callback: () => any) => void,
    resetCaptcha?: () => void,
  ) => {
    validate({id: this.state.id, distance: validateValue}).then(res => {
        const data = JSON.parse(res);
        const { code } = data;
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
        resetCaptcha();
    });
  };

  test = () => this.aaa.resetCaptcha();

  render() {
    return(
      <div style={{ height: '500px'}}>
        <SlideCaptcha
          ref={ref => this.aaa = ref}
          displayType="static"
          puzzleUrl={this.state.puzzleUrl}
          bgUrl={this.state.bgUrl}
          onRequest={this.resultCallback}
          onReset={this.handleGetPuzzleInfo}
          containerClassName="slideCaptchaContainer"
          tipsStyle={{ fontSize: '14px'}}
          tipsText="按住滑块，拖住完成下方拼图"
          style={{ marginTop: '400px', width: '1000px' }}
          reset="manual"
          isLoading={this.state.isLoading}
          resetButton="outline"
          imagePosition={positionStringMap.top}
          robotValidate={{
            offsetY: 5,
            handler: ():void => {
              alert('错误，您并非人类');
            },
          }}
        />
        <div style={{ marginTop: '10px', width: '1000px', margin: '0 auto' }}>
          <button onClick={this.handleGetPuzzleInfo}>外部刷新</button>
        </div>
        <div style={{ marginTop: '10px', width: '1000px', margin: '0 auto' }}>
          <button onClick={this.test}>测试</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root'),
);
