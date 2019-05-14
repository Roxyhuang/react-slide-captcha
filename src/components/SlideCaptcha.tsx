/// <reference path='../../types/global.d.ts'/>

import * as React from 'react';
import './styles/index.less';

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

type robotValidateConfig =  {
  offsetY: number,
  handler: () => any,
};

interface IProps {
  readonly puzzleUrl: string;
  readonly bgUrl: string;
  readonly onRequest: (validateValue: number, validatedSuccess: any, validatedFail?: any) => void;
  readonly slidedImage?: any;
  readonly slidedImageSuccess?: any;
  readonly slidedImageError?: any;
  readonly containerClassName?: string;
  readonly tipsClassName?: string;
  readonly tipsStyle? : object;
  readonly style?: object;
  readonly tipsText?: string;
  readonly robotValidate?: robotValidateConfig;
  readonly resetButton?: boolean;
  readonly resetButtonClass?: string;
  readonly resetButtonStyle?: object;
  readonly reset?: string;
  readonly onReset?: () => any;
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

    setTimeout(() => {
      this.maxSlidedWidth = this.ctrlWidth.clientWidth - this.sliderWidth.clientWidth;
    }, 200);
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>): void {
      if(nextProps.reset === resetTypeMap.manual){
        this.setState({
          offsetX: 0,
          originX: 0,
          originY: 0,
          totalY: 0,
          isTouchEndSpan: false,
          isMoving: false,
          validated: validateStatus.init,
          imgDisplayStatus: imgDisplayStatus.hidden
        });
      }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.listenMouseUp);
    document.removeEventListener('mousemove', this.listenMouseMove);

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
    this.handleMoveOver(e);
    this.setState({
      originX: this.getClientX(e),
      originY: this.getClientY(e),
    });
  };

  private handleTouchMove = (e): void => {
    e.preventDefault();
    this.move(e);
    this.setState({
      isMoving: true,
    });
  };

  private handleTouchEnd = (e): void => {
    // this.handleMoveOut(e);
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
        this.props.onRequest(validateValue, this.validatedSuccess, this.validatedFail);
      }
    } else {
      this.resetCaptcha();
    }
  };

  resetCaptcha = () => {
    this.setState({
      offsetX: 0,
      originX: 0,
      originY: 0,
      totalY: 0,
      isTouchEndSpan: false,
      isMoving: false,
      validated: validateStatus.init,
      imgDisplayStatus: imgDisplayStatus.hidden
    });
    if(this.props.onReset) {
      this.props.onReset();
    }
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
    this.setState({
      originX: this.getClientX(e),
      originY: this.getClientY(e),
      isMoving: true,
    });
  };

  handlerMouseMove = (e) => {
    e.preventDefault();
    if (this.state.isMoving) {
      this.move(e);
    }
  };

  handlerMouseUp = (e) => {
    e.preventDefault();
    this.setState({
      isMoving: false,
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
    return(
      <div
        className={
          `slideCaptchaContainer ${this.props.containerClassName ?
            this.props.containerClassName : ''}`
        }
        style={this.props.style || {} }
      >
        <div
          onMouseMove={this.handlerMouseMove}
          onMouseUp={this.handlerMouseUp}
        >
          <div className="panel" style={{display: this.state.imgDisplayStatus}}>
            <img src={this.props.bgUrl} className="bgImg" />
            <img
                src={this.props.puzzleUrl}
                className="puzzleImg"
                style={{ left: `${this.state.offsetX}px` }}
            />
          </div>
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
        <div className="reset">
          <button className="reset-btn" onClick={this.resetCaptcha}>刷新</button>
        </div>
      </div>
    );
  }
}

export default SlideCaptcha;
