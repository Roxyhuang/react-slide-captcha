/// <reference path='../types/global.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SlideCaptcha from './components/SlideCaptcha';
import axios from 'axios';
import * as arrow from './assets/img/arrow.svg';
import * as arrow_white from './assets/img/arrow_white.svg';
import * as cross from './assets/img/cross.svg';
// render react DOM

console.log(arrow);

const resultCallback = (validateValue: number, validatedSuccess: (callback: () => any) => void,validatedFail?: (callback: () => any) => void ) => {
  axios({
    method: 'post',
    baseURL: 'http://localhost:5000',
    url: '/data',
  }).then((res) => {
    console.log(res);
    const flag = true;
    console.log(validateValue);
    if (flag) {
      validatedSuccess(() => {
        alert('验证成功');
      });

    } else {
      validatedFail(() => {
        alert('验证失败');
      });
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
      slidedImage={<img src={arrow} />}
      slidedImageSuccess={<img src={arrow_white} />}
      slidedImageError={<img src={cross} />}
    />
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root'),
);
