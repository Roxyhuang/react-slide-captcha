import * as React from 'react';
import { shallow } from 'enzyme';
import SlideCaptcha from '../../src/index';

test('SlideCaptcha', () => {
  const component = shallow(<SlideCaptcha
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
  />);

  expect(component).toMatchSnapshot();

});
