import * as React from 'react';
import {  shallow } from 'enzyme';
import SlideCaptcha from '../../src/index';

test('Test DefaultProps.', async () => {
  let refs;
  const component = shallow(
    <SlideCaptcha
            ref={ref => refs = ref}
            puzzleUrl="www.baidu.com"
            bgUrl="www.baidu.com"
            onRequest={() => console.log(123)}
          />);
  const { props } = refs;
  expect(props.displayType).toEqual('hover');
  expect(props.reset).toEqual('auto');
  expect(props.resetButton).toEqual('none');
  expect(props.position).toEqual('bottom');
  expect(props.tipsText).toEqual('向右滑动滑块填充拼图');
  expect(props.isLoading).toEqual(false);

  expect(component).toMatchSnapshot();
});

test('SlideCaptcha', () => {
  const component = shallow(<SlideCaptcha
    displayType="hover"
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
  />);

  expect(component).toMatchSnapshot();
});
