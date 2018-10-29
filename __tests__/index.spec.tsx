import * as React from 'react';
import * as Enzyme from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
import SlideCaptcha from '../src/index';

// Enzyme.configure({ adapter: new Adapter() });

test('test for index', () => {
  const renderer = Enzyme.shallow(<SlideCaptcha
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
  />);
  expect(renderer.text()).toEqual('>请向右滑动滑块填充拼图') // Pass
});
