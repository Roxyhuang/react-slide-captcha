# react-slide-captcha

## 1.如何使用

### (1) 安装

```bash
npm i -S react-slide-captcha
```

### (2) 依赖

```markdown
1. react 
2. react-dom
```

### (3) 引入

```typescript jsx
import SlideCaptcha from 'react-slide-captcha';
import 'react-slide-captcha/dist/styles.css';

<SlideCaptcha
   puzzleUrl={this.state.puzzleUrl}
   bgUrl={this.state.bgUrl}
   onRequest={this.resultCallback}
   containerClassName="test"
/>
```

## 2 参数


| 参数 | 说明 | 类型 | 默认值|
| ------ | ------ | ------ |----------|
| **puzzleUrl** | 拼图图片地址（必填） | string | - |
| **bgUrl** | 背景图片地址（必填） | string | - |
| **onRequest** | 回调（必填）  | (validateValue: number, validatedSuccess: any, validatedFail?: any) => void| - |
| **slidedImage** | 滑块图片（可选）  | string | '>' |
| **slidedImageSuccess** | 滑块图片（可选） | string |  '>'
| **slidedImageError** | 滑块图片（可选） | string | 'X'
| **containerClassName** | 滑块图片（可选） | any | -|
| **style**| 滑块图片（可选） | object | - |
| **tipsText**| 滑块图片（可选） | string | - |
| **robotValidate**| 滑块图片（可选） | object: {  offsetY: number, handler: () => any,} | - |

