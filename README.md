# react-slide-captcha

![GitHub](https://img.shields.io/github/license/Roxyhuang/react-slide-captcha.svg)
[![Build Status](https://travis-ci.org/boennemann/badges.svg?branch=master)](https://travis-ci.org/boennemann/badges)
[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)
[![codecov](https://codecov.io/gh/Roxyhuang/react-slide-captcha/branch/master/graph/badge.svg)](https://codecov.io/gh/Roxyhuang/react-slide-captcha)
## 1.Usage

### (1) Installation

```bash
npm i -S react-slide-captcha
```

### (2) require

```markdown
1. react 
2. react-dom
```

### (3) simple example

```javascript
import SlideCaptcha from 'react-slide-captcha';
import 'react-slide-captcha/dist/styles.css';

<SlideCaptcha
   puzzleUrl={this.state.puzzleUrl}
   bgUrl={this.state.bgUrl}
   onRequest={this.resultCallback}
   containerClassName="test"
/>
```

## 2 Live Demo

### (1) Desktop Demo

[\[Desktop Demo\]](https://roxyhuang.github.io/react-slide-captcha.github.io/preview/index.html)

### (2) Mobile Demo

![](https://raw.githubusercontent.com/Roxyhuang/react-slide-captcha/master/src/assets/img/qrcode.png)

## 3 API （2.x）

| Properties | Descrition | Type | Default|
| ------ | ------ | ------ |----------|
| **puzzleUrl** | URL for puzzlei mage（required） | string | - |
| **bgUrl** | URL for background image（required） | string | - |
| **onRequest** | requeset callback（required）  | (validateValue: number, validatedSuccess: any, validatedFail?: any) => void| - |
| **slidedImage** | element for slided（optional）  | JSX.Element | 'defalut svg' |
| **slidedImageMoving** | moving element for slided（optional）  | JSX.Element | 'default moving svg' |
| **slidedImageSuccess** | success element for slided（optional） | JSX.Element |  'default success svg'
| **slidedImageError** | error element for slided（optional） | JSX.Element | 'defalut default error svg'
| **containerClassName** | container class（optional） | any | -|
| **style**| container style（optional） | object | - |
| **tipsText**| text for tips（optional） | string | - |
| **tipsClassName** | tips class（optional） | any | -|
| **tipsStyle**| tips style（optional） | object | - |
| **robotValidate**| robot validate config（optional） | object: {  offsetY: number, handler: () => any,} | - |
| **reset**| component reset type **auto/manual** （optional） | string | auto |
| **resetButton**| component reset type **none/inline/outline**（optional） | JSX.Element | 'auto' |
| **resetButtonElement**| component reset type（optional） | string | default button svg |
| **onReset**| reset call back（optional） | () => any | - |
| **imagePosition**| bg image position type **top/bottom** （optional） | string | 'bottom' |
| **isLoading**| loading status（optional） | boolean | false |
| **loadingIcon**| loading icon（optional） | JSX.Element | defalut loading svg |
| **displayType**| display type **hover/static**（optional） | string | 'hover' |
| **hoverPanelStyle**| hover panel style（optional） | object | - |
| **hoverPanelClassName**| hover panel className（optional） | string| - |


## 4 License
This entire project are built based on MIT license

MIT
