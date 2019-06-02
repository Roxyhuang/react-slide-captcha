# react-slide-captcha

[![Build Status](https://travis-ci.org/boennemann/badges.svg?branch=master)](https://travis-ci.org/boennemann/badges)

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

### (3) example

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

## 2 API


| 参数 | 说明 | 类型 | 默认值|
| ------ | ------ | ------ |----------|
| **puzzleUrl** | URL for puzzlei mage（required） | string | - |
| **bgUrl** | URL for background image（required） | string | - |
| **onRequest** | requeset callback（required）  | (validateValue: number, validatedSuccess: any, validatedFail?: any) => void| - |
| **slidedImage** | image for slided（optional）  | string | '>' |
| **slidedImageSuccess** | success image for slided（optional） | string |  '>'
| **slidedImageError** | error image for slided（optional） | string | 'X'
| **containerClassName** | container class（optional） | any | -|
| **style**| container style（optional） | object | - |
| **tipsText**| text for tips（optional） | string | - |
| **tipsClassName** | tips class（optional） | any | -|
| **tipsStyle**| tips style（optional） | object | - |
| **robotValidate**| robot validate config（optional） | object: {  offsetY: number, handler: () => any,} | - |
| **reset**| component reset type（optional） | string | auto |
| **onReset**| reset call back（optional） | () => any | - |
