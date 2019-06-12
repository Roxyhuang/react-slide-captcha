import * as React from 'react';
import {  mount } from 'enzyme';
import SlideCaptcha from '../../../src/index';

test('Test DefaultProps.', async () => {
  const wrapper = mount(
    <SlideCaptcha
            puzzleUrl="www.baidu.com"
            bgUrl="www.baidu.com"
            onRequest={() => console.log(123)}
          />);
  expect(wrapper.props().displayType).toEqual('hover');
  expect(wrapper.props().reset).toEqual('auto');
  expect(wrapper.props().resetButton).toEqual('none');
  expect(wrapper.props().imagePosition).toEqual('bottom');
  expect(wrapper.props().tipsText).toEqual('向右滑动滑块填充拼图');
  expect(wrapper.props().isLoading).toEqual(false);
});

test('calls componentWillReceiveProps',async () => {
  const componentWillReceivePropsSpy = jest.spyOn(SlideCaptcha.prototype, 'componentWillReceiveProps');
  // if reset = manual
  let wrapper = await mount(
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
  // // if reset = auto
  wrapper.setProps({ reset: 'auto' });
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
  // const wrapper = mount(<SlideCaptcha
  //   displayType="hover"
  //   puzzleUrl="www.baidu.com"
  //   bgUrl="www.baidu.com"
  //   onRequest={() => console.log(123)}
  //   containerClassName="test"
  //   tipsText="请向右滑动滑块填充拼图"
  //   style={{width: '500px'}}
  // />);
  // const spyFunction = jest.spyOn(wrapper.instance(), 'resetCaptcha');
  // spyFunction.mockRestore();
});

test('call function', () => {
  // const wrapper = mount(<SlideCaptcha
  //   displayType="hover"
  //   puzzleUrl="www.baidu.com"
  //   bgUrl="www.baidu.com"
  //   onRequest={() => console.log(123)}
  //   containerClassName="test"
  //   tipsText="请向右滑动滑块填充拼图"
  //   style={{width: '500px'}}
  // />);
  // const spyFunction = jest.spyOn(wrapper.instance(), 'handlerMouseDown');
  // const spyFunction1 = jest.spyOn(wrapper.instance(), 'listenMouseUp');
  // const spyFunction2 = jest.spyOn(wrapper.instance(), 'listenMouseMove');
  // const event = {target: {name: "pollName", value: "spam", preventDefault: () => console.log(123)}};
  // wrapper.find('.slider').at(0).simulate('click');
  // expect(spyFunction(event)).toHaveBeenCalledTimes(1);
  // spyFunction.mockRestore();
  // spyFunction1.mockRestore();
  // spyFunction2.mockRestore();
});

test('change state', () => {
  const wrapper = mount(<SlideCaptcha
    displayType="hover"
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
  />);

  wrapper.setState({isMoving: true, isTouchEndSpan: true});
  wrapper.setState({validated: 1});
  wrapper.setState({validated: -1});
  wrapper.setState({validated: 0});
  wrapper.setState({isSliderHover: true});
  wrapper.mount();
});

test('test displayType hover', () => {
  const wrapper = mount(<SlideCaptcha
    displayType="hover"
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
    imagePosition="top"
    resetButtonElement={<div>123</div>}
  />);

  wrapper.mount();
  wrapper.setState({isMoving: true});
  wrapper.setProps({isLoading: true});
  wrapper.setState({isMoving: false});
  wrapper.setProps({isLoading: true});
  wrapper.setProps({resetButton: 'outline'});
  wrapper.setProps({resetButton: 'inline'});
});

test('test displayType static', () => {
  const wrapper = mount(<SlideCaptcha
    displayType="static"
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
    imagePosition="top"
  />);

  wrapper.mount();
  wrapper.setState({isMoving: true});
  wrapper.setProps({isLoading: true});
  wrapper.setState({isMoving: false});
  wrapper.setProps({isLoading: true});
  wrapper.setProps({resetButton: 'outline'});
  wrapper.setProps({resetButton: 'inline'});
});
