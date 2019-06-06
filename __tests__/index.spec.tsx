import * as React from 'react';
import { shallow } from 'enzyme';
import SlideCaptcha from '../src/index';

test('renders correctly', () => {
  const renderer = shallow(<SlideCaptcha
    displayType="hover"
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
  />);
  expect(renderer).toEqual(
    <SlideCaptcha
      displayType="hover"
      puzzleUrl="www.baidu.com"
      bgUrl="www.baidu.com"
      onRequest={() => console.log(123)}
      containerClassName="test"
      tipsText="请向右滑动滑块填充拼图"
      style={{width: '500px'}}
    />);

  expect(renderer).toMatchSnapshot();
});
