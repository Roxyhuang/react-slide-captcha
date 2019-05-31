/// <reference path='../../types/global.d.ts'/>

import * as React from 'react';
import './styles/index.less';
import * as loading from '../assets/img/loading.svg';
import * as arrow from '../assets/img/arrow.svg';
import * as arrow_white from '../assets/img/arrow_white.svg';
import * as cross from '../assets/img/cross.svg';

enum validateStatus{
  init = 0,
  success = 1,
  error = -1,
}

enum imgDisplayStatus {
  show =  'block',
  hidden = 'none',
}

enum resetTypeMap {
  auto = 'auto',
  manual = 'manual',
}

enum positionStringMap {
  top =  'top',
  bottom = 'bottom',
}

enum resetButtonMap {
  none = 'none',
  inline = 'inline',
  outline = 'outline'
}

type robotValidateConfig =  {
  offsetY: number,
  handler: () => any,
};

interface IProps {
  readonly puzzleUrl: string;
  readonly bgUrl: string;
  readonly onRequest: (validateValue: number, validatedSuccess: any, validatedFail?: any, resetCaptcha?: any) => void;
  readonly slidedImage?: any;
  readonly slidedImageSuccess?: any;
  readonly slidedImageError?: any;
  readonly containerClassName?: string;
  readonly tipsClassName?: string;
  readonly tipsStyle? : object;
  readonly style?: object;
  readonly tipsText?: string;
  readonly robotValidate?: robotValidateConfig;
  readonly resetButton?: string;
  readonly resetButtonClass?: string;
  readonly resetButtonStyle?: object;
  readonly reset?: string;
  readonly onReset?: () => any;
  readonly imagePosition?: positionStringMap;
  readonly loadingIcon? : React.Component | string;
  readonly isLoading?: boolean;
}

interface IState {
  originX: number;
  offsetX: number;
  originY: number;
  totalY: number;
  validated: validateStatus;
  isMoving: boolean;
  isTouchEndSpan: boolean;
  imgDisplayStatus: imgDisplayStatus;
}

class SlideCaptcha extends React.Component<IProps, IState>{
  public static defaultProps = {
    reset: resetTypeMap.auto,
    resetButton: resetButtonMap.none,
    position: positionStringMap.bottom,
    isLoading: false,
    slidedImage: ( <img src={arrow} style={{width: '18px'}} />),
    slidedImageSuccess: ( <img src={arrow_white} style={{width: '18px'}} />),
    slidedImageError: ( <img src={cross} style={{width: '18px'}} />),
    loadingIcon: (
      <img src={loading} className="slideCaptchaLoading" />
    )
  };

  state: IState = {
    originX: 0,
    offsetX: 0,
    originY: 0,
    totalY: 0,
    validated: validateStatus.init,
    isMoving: false,
    isTouchEndSpan: false,
    imgDisplayStatus: imgDisplayStatus.hidden,
  };
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.listenMouseUp);

    document.addEventListener('mousemove', this.listenMouseMove);

    this.timeout = setTimeout(() => {
      this.maxSlidedWidth = this.ctrlWidth.clientWidth - this.sliderWidth.clientWidth;
      const resetHeight = this.reset && this.props.resetButton === resetButtonMap.outline ? this.reset.clientHeight + 1 : 0;
      this.otherHeight = this.ctrlWidth.clientHeight + resetHeight;
    }, 200);
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>): void {
      if(nextProps.reset === resetTypeMap.manual){
        this.resetCaptcha(false);
      }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.listenMouseUp);
    document.removeEventListener('mousemove', this.listenMouseMove);
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  private maxSlidedWidth: number = 0;
  private ctrlWidth: any = null;
  private sliderWidth: any = null;
  private timeout: any = null;
  private reset: any = null;
  private otherHeight: number = 0;

  private getClientX = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientX;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientX;
    }
  };

  private getClientY = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientY;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientY;
    }
  };

  private move = (e): void => {
    const clientX = this.getClientX(e);
    const clientY = this.getClientY(e);
    let offsetX = clientX - this.state.originX;
    const offsetY = Math.abs(clientY - this.state.originY);
    const totalY = this.state.totalY + offsetY;
    if (offsetX > 0) {
      if (offsetX > this.maxSlidedWidth) {
        offsetX = this.maxSlidedWidth;
      }
      this.setState({
        offsetX,
        totalY,
        // isMoving: true,
      });
    }
  };

  public validatedSuccess = (callback: () => any):void => {
    this.setState({
      validated: validateStatus.success,
    }, () => {
      callback();
      if(this.props.reset === resetTypeMap.auto) {
        setTimeout(() => {
          this.resetCaptcha();
        }, 500);
      }
    });

  };

  public validatedFail = (callback: () => any): any => {
    this.setState({
      validated: validateStatus.error,
    }, ()=> {
      callback();
      if(this.props.reset === resetTypeMap.auto) {
        setTimeout(() => {
          this.resetCaptcha();
        }, 500);
      }
    });
  };

  private handleTouchStart = (e): void => {
    e.preventDefault();
    if(this.state.isTouchEndSpan || this.props.isLoading) {
      return;
    }
    this.handleMoveOver(e);
    this.setState({
      originX: this.getClientX(e),
      originY: this.getClientY(e),
    });
  };

  private handleTouchMove = (e): void => {
    e.preventDefault();
    if(this.state.isTouchEndSpan || this.props.isLoading) {
      return;
    }
    this.move(e);
    this.setState({
      isMoving: true,
    });
  };

  private handleTouchEnd = (e): void => {
    if(this.state.isTouchEndSpan || this.props.isLoading) {
      return;
    }
    if(this.state.totalY <  (this.props.robotValidate && this.props.robotValidate.offsetY || 0) ) {
      this.setState({
        offsetX: 0,
        originX: 0,
        originY: 0,
        totalY: 0,
        isTouchEndSpan: false,
        isMoving: false,
        validated: validateStatus.error,
      }, () => {
        this.handleMoveOut(e);
        this.props.robotValidate && this.props.robotValidate.handler ? this.props.robotValidate.handler() : alert('请重试');
      });
      return;
    }

    if (this.state.offsetX > 0) {
      const validateValue = this.state.offsetX / this.maxSlidedWidth;
      this.setState({
        isTouchEndSpan: true,
        isMoving: false,
      });
      if (this.props.onRequest) {
        this.props.onRequest(validateValue, this.validatedSuccess, this.validatedFail, this.resetCaptcha);
      }
    } else {
        this.resetCaptcha();
    }
  };

  resetCaptcha = (isReset: boolean = true) => {
    const targetPercent = 0;
    const speed = this.maxSlidedWidth / 30;
    const animate = () => {
      const percent = this.state.offsetX;
      const currentProgress = percent < speed ? 0 : percent - speed;
      if (percent > targetPercent) {
        this.setState({
          offsetX: currentProgress
        }, () => {
          window.requestAnimationFrame(animate);
        });
      } else {
        this.setState({
          offsetX: 0,
          originX: 0,
          originY: 0,
          totalY: 0,
          isTouchEndSpan: false,
          isMoving: false,
          validated: validateStatus.init,
          imgDisplayStatus: imgDisplayStatus.hidden,
        }, () => {
          if(this.props.onReset && isReset) {
            this.props.onReset();
          }
        });
      }
    };
    window.requestAnimationFrame(animate);
  };

  renderImage = ():any => {
    const slidedImageValue = this.props.slidedImage || '>';
    const slidedImageSuccessValue = this.props.slidedImageSuccess || '>';
    const slidedImageErrorValue = this.props.slidedImageError || 'x';
    return { slidedImageValue, slidedImageSuccessValue, slidedImageErrorValue };
  };

  renderCtrlClassName = (slidedImage, slidedImageSuccess, slidedImageError) => {
    let ctrlClassName;
    let slidedImageValue = slidedImage;
    if (this.state.isMoving) {
      ctrlClassName = 'slider-moving';
    } else {
      if (this.state.isTouchEndSpan) {
        if (this.state.validated === validateStatus.success) {
          ctrlClassName = 'slider-end slider-success';
          slidedImageValue = slidedImageSuccess;
        } else if (this.state.validated === validateStatus.error) {
          ctrlClassName = 'slider-end slider-error';
          slidedImageValue = slidedImageError;
        } else {
          ctrlClassName = 'slider-moving';
        }
      } else {
        ctrlClassName = '';
      }
    }
    return { ctrlClassName, slidedImage: slidedImageValue };
  };

  handlerMouseDown = (e) => {
    e.preventDefault();
    if(this.state.isTouchEndSpan || this.props.isLoading) {
      return;
    }
    this.setState({
      originX: this.getClientX(e),
      originY: this.getClientY(e),
      isMoving: true,
    });
  };

  handlerMouseMove = (e) => {
    e.preventDefault();
    if(this.state.isTouchEndSpan || this.props.isLoading) {
      return;
    }
    if (this.state.isMoving) {
      this.move(e);
    }
  };

  handlerMouseUp = (e) => {
    e.preventDefault();
    if(this.state.isTouchEndSpan || this.props.isLoading) {
      return;
    }
    this.setState({
      isMoving: false,
      // isTouchEndSpan: true,
    });
    this.handleTouchEnd(e);
  };

  handleMoveOut = (e) => {
    e.preventDefault();
    if(this.state.imgDisplayStatus === imgDisplayStatus.show
      && this.state.isMoving === false
      && this.state.validated === validateStatus.init
    ){
      this.setState({
        imgDisplayStatus: imgDisplayStatus.hidden,
      });
    }
  };

  handleMoveOver = (e) => {
    e.preventDefault();
    if(this.state.imgDisplayStatus === imgDisplayStatus.hidden){
      this.setState({
        imgDisplayStatus: imgDisplayStatus.show,
      });
    }
  };

  listenMouseUp = (e) => {
    if(this.state.isMoving === true) {
      this.handlerMouseUp(e);
    }
  };

  listenMouseMove = (e) => {
    this.handlerMouseMove(e);
  };

  render() {
    const {
      slidedImageValue, slidedImageSuccessValue, slidedImageErrorValue,
    } = this.renderImage();

    const { ctrlClassName, slidedImage } = this.renderCtrlClassName(
      slidedImageValue,
      slidedImageSuccessValue,
      slidedImageErrorValue,
    );

    let positionObj;

    if(this.props.imagePosition === positionStringMap.top) {
      positionObj = {display: this.state.imgDisplayStatus, bottom: `${this.otherHeight}px`}
    } else {
      positionObj = {display: this.state.imgDisplayStatus, top: `${this.otherHeight}px`}
    }


    return(
      <div
        className={
          `slideCaptchaContainer ${this.props.containerClassName ?
            this.props.containerClassName : ''}`
        }
        style={this.props.style || {} }
        onMouseMove={this.handlerMouseMove}
        onMouseUp={this.handlerMouseUp}
      >
        <div className="panel" style={positionObj}>
          {
            this.props.isLoading ?
              <div className="loadingContainer">
                {this.props.loadingIcon}
              </div>
              : (
              <div className="bgContainer">
                <img src={this.props.bgUrl} className="bgImg" />
                <img
                  src={this.props.puzzleUrl}
                  className="puzzleImg"
                  style={{ left: `${this.state.offsetX}px` }}
                />
              </div>
            )
          }
          {this.props.resetButton === resetButtonMap.inline ?
            (
              <div className="reset inline" ref={(el) => { this.reset = el; } }>
                <button className="reset-btn" onClick={() => this.resetCaptcha()}>刷新</button>
              </div>
            ) : null
          }
        </div>
        <div>
          <div
            className={`control ${ctrlClassName ? ctrlClassName : ''}`}
            ref={(el) => { this.ctrlWidth = el; } }
          >
            <div className="slided" style={{ width: `${this.state.offsetX}px` }} />
            <div className="slider"
                 ref={(el) => { this.sliderWidth = el; }}
                 style={{ left: `${this.state.offsetX}px` }}
                 onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove}
                 onTouchEnd={this.handleTouchEnd}
                 onMouseDown={this.handlerMouseDown}
                 onMouseOver={this.handleMoveOver}
                 onMouseOut={this.handleMoveOut}
            >
              {slidedImage}
            </div>
            <div
              className={`tips ${this.props.tipsClassName ?
              this.props.tipsClassName : ''
              }`}
              style={this.props.tipsStyle || {} }
            >
              <span>
                {this.props.tipsText || '向右滑动滑块填充拼图'}
              </span>
            </div>
          </div>
        </div>
        {this.props.resetButton === resetButtonMap.outline ?
          (
            <div className="reset outline" ref={(el) => { this.reset = el; } }>
              <button className="reset-btn" onClick={() => this.resetCaptcha()}>刷新</button>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default SlideCaptcha;
