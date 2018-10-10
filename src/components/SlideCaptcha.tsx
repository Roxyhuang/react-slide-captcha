/// <reference path='../../types/global.d.ts'/>

import * as React from 'react';
import './styles/index.less';

interface IProps {
  readonly puzzleUrl: string;
  readonly bgUrl: string;
  readonly onRequest: (validateValue: number, validatedSuccess: any, validatedFail?: any) => void;
  readonly containerClassName?: string;
  readonly slidedImage?: any
  readonly slidedImageSuccess?: any
  readonly slidedImageError?: any
}

interface IState {
  originX: number;
  offsetX: number;
  puzzleUrl: string;
  bgUrl: string;
  validated: boolean;
  isMoving: boolean;
  isTouchEndSpan: boolean;
}

class SlideCaptcha extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      originX: 0,
      offsetX: 0,
      puzzleUrl: '',
      bgUrl: '',
      validated: false,
      isMoving: false,
      isTouchEndSpan: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.maxSlidedWidth = this.ctrlWidth.clientWidth - this.sliderWidth.clientWidth;
    }, 0)

  }

  private maxSlidedWidth: number = 0;
  private ctrlWidth: any = null;
  private sliderWidth: any = null;

  private getClientX = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientX;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientX;
    }
  }

  private move = (e): void => {
    const clientX = this.getClientX(e);
    let offsetX = clientX - this.state.originX;
    if (offsetX > 0) {
      if (offsetX > this.maxSlidedWidth) {
        // 超过最大移动范围，按极限值算
        offsetX = this.maxSlidedWidth;
      }
      this.setState({
        offsetX,
        isMoving: true,
      })
    }
  }

  public validatedSuccess = (callback: () => any):void => {
    this.setState({
      validated: true
    },callback());

  };

  public validatedFail = (callback: () => any): void => {
    callback();
  };

  private handleTouchStart = (e): void => {
    e.preventDefault();
    this.setState({
      originX: this.getClientX(e),
    })
  };

  private handleTouchMove = (e): void => {
    e.preventDefault();
    this.move(e);
  }

  private handleTouchEnd = (e): void => {
    e.preventDefault();
    if (this.state.offsetX > 0) {
      const validateValue = this.state.offsetX / this.maxSlidedWidth;
      this.setState({
        isTouchEndSpan: true,
        isMoving: false
      });
      if(this.props.onRequest) {
        this.props.onRequest(validateValue, this.validatedSuccess, this.validatedFail);
      }
      setTimeout(() => {
        this.setState({
          offsetX: 0,
          originX: 0,
          isTouchEndSpan: false
        })
      }, 300);
    } else {
      this.setState({
        isTouchEndSpan: false,
        isMoving: false,
        offsetX: 0,
        originX: 0
      });
    }
  }

  render() {
    let ctrlClassName;
    let slidedImage = this.props.slidedImage || '>';
    if (this.state.isMoving) {
      ctrlClassName = 'slider-moving';
      if(this.props.slidedImageSuccess) {
        slidedImage = this.props.slidedImageSuccess
      }
    } else if (this.state.isTouchEndSpan) {
      ctrlClassName = 'slider-end';
      if(this.props.slidedImageError) {
        slidedImage = this.props.slidedImageError
      }
    }
    return(
      <div>
        <div className={`slideCaptchaContainer ${this.props.containerClassName ? this.props.containerClassName: ''}`}>
          <div className="panel">
            <img src={this.props.bgUrl} className="bgImg" />
            <img src={this.props.puzzleUrl} className="puzzleImg"  style={{left: `${this.state.offsetX}px`}} ref={(el) => { this.sliderWidth = el;}} />
          </div>
          <div className={`control ${ctrlClassName ? ctrlClassName: ''}`} ref={(el)=>  { this.ctrlWidth = el; } }>
            <div className="slided" style={{width: `${this.state.offsetX}px`}} />
            <div className="slider"
                 style={{left: `${this.state.offsetX}px`}}
                 onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove}
                 onTouchEnd={this.handleTouchEnd}
            >
              {slidedImage}
            </div>
            <div className="tips">
              <span>
                向右滑动滑块填充拼图
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlideCaptcha;
