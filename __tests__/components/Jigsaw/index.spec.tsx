import * as React from 'react';
import {  shallow, mount } from 'enzyme';
import SlideCaptcha from '../../../src/index';

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

test('calls componentWillReceiveProps',async () => {
  const componentWillReceivePropsSpy = jest.spyOn(SlideCaptcha.prototype, 'componentWillReceiveProps');
  const wrapper = await mount(
    <SlideCaptcha
      displayType="hover"
      puzzleUrl="www.baidu.com"
      bgUrl="www.baidu.com"
      onRequest={() => console.log(123)}
      containerClassName="test"
      tipsText="请向右滑动滑块填充拼图"
      style={{width: '500px'}}
      reset="manual"
    />
  );
  wrapper.mount();
  expect(SlideCaptcha.prototype.componentWillReceiveProps).toHaveBeenCalled();
  componentWillReceivePropsSpy.mockRestore();
});

test('calls componentWillUnmount',async () => {

  jest.spyOn(SlideCaptcha.prototype, 'componentWillUnmount');
  const wrapper = await mount(
    <SlideCaptcha
      displayType="hover"
      puzzleUrl="www.baidu.com"
      bgUrl="www.baidu.com"
      onRequest={() => console.log(123)}
      containerClassName="test"
      tipsText="请向右滑动滑块填充拼图"
      style={{width: '500px'}}
    />
  );
  wrapper.unmount();
  expect(SlideCaptcha.prototype.componentWillUnmount).toHaveBeenCalledTimes(1);
});

test('calls component resetCaptcha', async() => {
  const spyFunction = jest.spyOn(SlideCaptcha.prototype, 'resetCaptcha');
  SlideCaptcha.prototype.resetCaptcha();
  expect(spyFunction).toHaveBeenCalled();
  spyFunction.mockRestore();
});

test('test render', () => {
  const component = mount(<SlideCaptcha
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
