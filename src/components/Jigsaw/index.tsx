/// <reference path='../../../types/global.d.ts'/>

import * as React from 'react';
import './styles/index.less';
import * as loading from '../../assets/img/loading.svg';
import * as arrow from '../../assets/img/arrow.svg';
import * as arrow_white from '../../assets/img/arrow_white.svg';
import * as cross from '../../assets/img/cross.svg';
import * as reload from '../../assets/img/reload_white.svg';

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
  outline = 'outline',
}

enum displayTypeMap {
  hover = 'hover',
  static = 'static',
}

type robotValidateConfig =  {
  offsetY: number,
  handler: () => any,
};

interface IProps {
  readonly puzzleUrl: string;
  readonly bgUrl: string;
  readonly onRequest: (validateValue: number,
                       validatedSuccess: any,
                       validatedFail?: any,
                       resetCaptcha?: any,
                      ) => void;
  readonly slidedImage?: any;
  readonly slidedImageMoving?: any;
  readonly slidedImageSuccess?: any;
  readonly slidedImageError?: any;
  readonly containerClassName?: string;
  readonly tipsClassName?: string;
  readonly tipsStyle? : object;
  readonly style?: object;
  readonly tipsText?: string;
  readonly robotValidate?: robotValidateConfig;
  readonly resetButton?: string;
  readonly resetButtonElement?: JSX.Element | string;
  readonly reset?: string;
  readonly onReset?: () => any;
  readonly imagePosition?: string;
  readonly loadingIcon? : JSX.Element  | string;
  readonly isLoading?: boolean;
  readonly displayType?: string;
  readonly hoverPanelStyle?: object;
  readonly hoverPanelClassName?: string;
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
  otherHeight: number;
  isSliderHover: boolean;
}

class SlideCaptcha extends React.Component<IProps, IState>{
  public static defaultProps = {
    displayType: displayTypeMap.hover,
    reset: resetTypeMap.auto,
    resetButton: resetButtonMap.none,
    imagePosition: positionStringMap.bottom,
    tipsText: '向右滑动滑块填充拼图',
    isLoading: false,
    slidedImage: (<img src={arrow} style={{ width: '18px' }} />),
    slidedImageSuccess: (<img src={arrow_white} style={{ width: '18px' }} />),
    slidedImageMoving: (<img src={arrow_white} style={{ width: '18px' }} />),
    slidedImageError: (<img src={cross} style={{ width: '18px' }} />),
    loadingIcon: (
      <img src={loading} className="slideCaptchaLoading" />
    ),
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
    otherHeight: 0,
    isSliderHover: false,
  };
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.listenMouseUp);

    document.addEventListener('mousemove', this.listenMouseMove);

    this.timeout = setTimeout(() => {
      this.maxSlidedWidth = this.ctrlWidth.clientWidth - this.sliderWidth.clientWidth;
      const resetHeight = this.reset && this.props.resetButton === resetButtonMap.outline
                          ? this.reset.clientHeight + 1
                          : 0;
      this.setState({
        otherHeight:this.ctrlWidth.clientHeight + resetHeight + 1,
      });
    }, 200);
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    if(nextProps.reset === resetTypeMap.manual) {
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

  private getClientX = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientX;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientX;
    }
  }

  private getClientY = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientY;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientY;
    }
  }

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
    }, () => {
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
    if(this.state.totalY <  ((this.props.robotValidate && this.props.robotValidate.offsetY) || 0)) {
      if(this.props.robotValidate && this.props.robotValidate.handler && this.state.isMoving) {
        this.props.robotValidate && this.props.robotValidate.handler
          ? this.props.robotValidate.handler()
          : console.log('Please try again');
        this.resetCaptcha();
        return;
      }
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
        this.props.onRequest(validateValue,
                            this.validatedSuccess,
                            this.validatedFail,
                            this.resetCaptcha,
                            );
      }
    } else {
        // this.resetCaptcha();
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
          offsetX: currentProgress,
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
          isSliderHover: false,
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
    const slidedImageValue = this.props.slidedImage;
    const slidedImageSuccessValue = this.props.slidedImageSuccess;
    const slidedImageErrorValue = this.props.slidedImageError;
    const slidedImageMoving = this.props.slidedImageMoving;
    return { slidedImageValue, slidedImageSuccessValue, slidedImageErrorValue, slidedImageMoving };
  };

  renderCtrlClassName = (slidedImage, slidedImageSuccess, slidedImageError, slidedImageMoving) => {
    let ctrlClassName;
    let slidedImageValue = slidedImage;
    if (this.state.isMoving) {
      ctrlClassName = 'slider-moving';
      slidedImageValue = slidedImageMoving;
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
        if(this.state.validated === validateStatus.init && this.state.isSliderHover) {
          ctrlClassName = 'slider-moving';
          slidedImageValue = slidedImageMoving;
        } else {
          ctrlClassName = '';
        }

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
    if(this.state.validated === validateStatus.init) {
      this.setState({
        isSliderHover: false,
      });
    }
    if(this.state.imgDisplayStatus === imgDisplayStatus.show
      && this.state.isMoving === false
      && this.state.validated === validateStatus.init
    ) {
      this.setState({
        imgDisplayStatus: imgDisplayStatus.hidden,
      });
    }
  };

  handleMoveOver = (e) => {
    e.preventDefault();
    if(this.state.validated === validateStatus.init) {
      this.setState({
        isSliderHover: true,
      });
    }

    if(this.state.imgDisplayStatus === imgDisplayStatus.hidden) {
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
      slidedImageValue, slidedImageSuccessValue, slidedImageErrorValue, slidedImageMoving,
    } = this.renderImage();

    const { ctrlClassName, slidedImage } = this.renderCtrlClassName(
      slidedImageValue,
      slidedImageSuccessValue,
      slidedImageErrorValue,
      slidedImageMoving,
    );

    let positionObj;
    let displayType;
    let buttonElement;
    let tipsText;
    let hoverPanelClassName;
    const  hoverPanelStyle = this.props.hoverPanelStyle;

    if(this.props.displayType === displayTypeMap.hover) {
      displayType = { display: this.state.imgDisplayStatus };
      hoverPanelClassName = this.props.hoverPanelClassName || null;
      if(this.props.imagePosition === positionStringMap.top) {
        positionObj = { position: 'absolute', bottom: `${this.state.otherHeight}px`, ...hoverPanelStyle }
      } else {
        positionObj = { position: 'absolute', top: `${this.state.otherHeight}px`, ...hoverPanelStyle }
      }
    } else {
      displayType = { display: imgDisplayStatus.show };
    }

    if(this.props.resetButtonElement) {
      buttonElement = this.props.resetButtonElement;
    } else {
      if(this.props.resetButton === resetButtonMap.outline) {
        buttonElement = <button className="reset-btn" />;
      } else if(this.props.resetButton === resetButtonMap.inline) {
        buttonElement = <img className="reset-btn" src={reload} />
      } else {
        buttonElement =  null;
      }
    }

    if(this.state.isMoving) {
      if(this.props.isLoading) {
        tipsText = '加载中...';
      } else {
        tipsText = null;
      }

    } else {
      if(this.props.isLoading) {
        tipsText = '加载中...';
      } else {
        tipsText = this.props.tipsText;
      }
    }

    if(this.state.validated !== validateStatus.init) {
      tipsText = null;
    }

    const renderPanel = () => {
     return (
        <div className={`${hoverPanelClassName ? `panel ${hoverPanelClassName }`: 'panel'}`} style={{...positionObj, ...displayType}}>
          {
            this.props.isLoading ?
              <div className="loadingContainer">
                {this.props.loadingIcon}
              </div>
              : (
                <div className="bgContainer">
                  <img src={this.props.bgUrl} className="bgImg"/>
                  <img
                    src={this.props.puzzleUrl}
                    className="puzzleImg"
                    style={{left: `${this.state.offsetX}px`}}
                  />
                </div>
              )
          }
          {this.props.resetButton === resetButtonMap.inline ?
            (
              <div className="reset reset-inline" ref={(el) => {
                this.reset = el;
              }}>
                <div className="rest-container" onClick={() => this.resetCaptcha()}>
                  {buttonElement}
                </div>
              </div>
            ) : null
          }
        </div>
      )
    };

    return(
      <div
        className={
          `slideCaptchaContainer ${this.props.containerClassName ?
            this.props.containerClassName : ''}`
        }
        style={this.props.style}
        onMouseMove={this.handlerMouseMove}
        onMouseUp={this.handlerMouseUp}
      >
        { renderPanel() }
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
                {tipsText}
              </span>
            </div>
          </div>
        </div>
        {this.props.resetButton === resetButtonMap.outline ?
          (
            <div className="reset reset-outline" ref={(el) => { this.reset = el; } }>
              <div className="rest-container" onClick={() => this.resetCaptcha()}>
                {buttonElement}
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default SlideCaptcha;
