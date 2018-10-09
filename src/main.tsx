import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SlideCaptcha from './components/SlideCaptcha';
import axios from 'axios';
// render react DOM

const resultCallback = (validatedSuccess: () => void,validatedFail?: () => void ) => {
  axios({
    method: 'post',
    baseURL: 'http://localhost:5000',
    url: '/data',
  }).then((res) => {
    console.log(res);
    const flag = false;
    if (flag) {
      validatedSuccess();
      // alert('验证成功');
    } else {
      validatedFail();
      // alert('验证失败');
    }
  }).catch(() => {
      console.log('报错啦');
  });

};


const Demo = () => {
  return (
    <SlideCaptcha
      puzzleUrl="http://localhost:5000/puzzle.png"
      bgUrl="http://localhost:5000/bg.jpg"
      onRequest={resultCallback}
      containerClassName="test"
    />
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root'),
);
