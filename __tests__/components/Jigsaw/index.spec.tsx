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
  wrapper.setProps({ reset: 'auto' });
  wrapper.update();
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
  expect(SlideCaptcha.prototype.componentWillUnmount).toHaveBeenCalled();
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

test('Test Props render', () => {
  const wrapper = mount(<SlideCaptcha
    puzzleUrl="www.baidu.com"
    bgUrl="www.baidu.com"
    onRequest={() => console.log(123)}
    containerClassName="test"
    tipsText="请向右滑动滑块填充拼图"
    style={{width: '500px'}}
    imagePosition="top"
    resetButtonElement={<div>123</div>}
  />);

  wrapper.setProps({displayType: 'hover'});
  wrapper.setProps({imagePosition: 'top'});
  wrapper.mount();
  expect(wrapper.props().displayType).toEqual('hover');
  expect(wrapper.props().imagePosition).toEqual('top');
  wrapper.setProps({isLoading: true});
  wrapper.update();
  expect(wrapper.find('.loadingContainer').exists()).toEqual(true);
  wrapper.setProps({displayType: 'static'});
  wrapper.setProps({imagePosition: 'bottom'});
  wrapper.update();
  expect(wrapper.props().displayType).toEqual('static');
  expect(wrapper.props().imagePosition).toEqual('bottom');
  wrapper.setProps({resetButton: 'outline'});

  wrapper.update();
  wrapper.setProps({resetButton: 'inline'});
  wrapper.update();
  wrapper.unmount();
});

test('test displayType static render', () => {
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
