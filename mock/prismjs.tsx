import * as Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/themes/prism-tomorrow.css';

const hoverInlineCode
  = '<SlideCaptcha\n' +
  '    ref={ref => this.vnode = ref}\n' +
  '    displayType="hover"\n' +
  '    puzzleUrl={this.state.puzzleUrl}\n' +
  '    bgUrl={this.state.bgUrl}\n' +
  '    onRequest={this.resultCallback}\n' +
  '    onReset={this.handleGetPuzzleInfo}\n' +
  '    containerClassName="slideCaptchaContainer"\n' +
  '    reset="manual"\n' +
  '    isLoading={this.state.isLoading}\n' +
  '    resetButton="outline"\n' +
  '    imagePosition="top"\n' +
  '  />';

const staticInlineCode
= '<SlideCaptcha\n' +
  '  ref={ref => this.vnode = ref}\n' +
  '  displayType="static"\n' +
  '  puzzleUrl={this.state.puzzleUrl}\n' +
  '  bgUrl={this.state.bgUrl}\n' +
  '  onRequest={this.resultCallback}\n' +
  '  onReset={this.handleGetPuzzleInfo}\n' +
  '  containerClassName="slideCaptchaContainer"\n' +
  '  reset="manual"\n' +
  '  isLoading={this.state.isLoading}\n' +
  '  resetButton="inline"\n' +
  '  imagePosition="top"\n' +
  '/>';

const outlineCode
= '<SlideCaptcha\n' +
  '   ref={ref => this.vnode = ref}\n' +
  '   displayType="static"\n' +
  '   puzzleUrl={this.state.puzzleUrl}\n' +
  '   bgUrl={this.state.bgUrl}\n' +
  '   onRequest={this.resultCallback}\n' +
  '   onReset={this.handleGetPuzzleInfo}\n' +
  '   containerClassName="slideCaptchaContainer"\n' +
  '   reset="manual"\n' +
  '   isLoading={this.state.isLoading}\n' +
  '   resetButton="outline"\n' +
  '   imagePosition="top"\n' +
  '/>';

const inlineCode
  = '<SlideCaptcha\n' +
  '   ref={ref => this.vnode = ref}\n' +
  '   displayType="static"\n' +
  '   puzzleUrl={this.state.puzzleUrl}\n' +
  '   bgUrl={this.state.bgUrl}\n' +
  '   onRequest={this.resultCallback}\n' +
  '   onReset={this.handleGetPuzzleInfo}\n' +
  '   containerClassName="slideCaptchaContainer"\n' +
  '   tipsStyle={{ fontSize: \'14px\'}}\n' +
  '   tipsText="按住滑块，拖住完成下方拼图"\n' +
  '   style={{ marginTop: \'400px\', width: \'1000px\' }}\n' +
  '   reset="manual"\n' +
  '   isLoading={this.state.isLoading}\n' +
  '   resetButton="inline"\n' +
  '   imagePosition="top"\n' +
  '   robotValidate={{\n' +
  '     offsetY: 5,\n' +
  '     handler: () => {\n' +
  '        alert(\'错误，您并非人类\');\n' +
  '     },\n' +
  '    }}\n' +
  '/>';

const hoverInlineCodeHtml = Prism.highlight(hoverInlineCode, Prism.languages.jsx, 'jsx');
const staticInlineCodeHtml = Prism.highlight(staticInlineCode, Prism.languages.jsx, 'jsx');
const outlineCodeHtml = Prism.highlight(outlineCode, Prism.languages.jsx, 'jsx');
const inlineCodeHtml = Prism.highlight(inlineCode, Prism.languages.jsx, 'jsx');

export { inlineCodeHtml, outlineCodeHtml, hoverInlineCodeHtml, staticInlineCodeHtml };
