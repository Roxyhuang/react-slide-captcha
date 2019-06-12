export enum validateStatus{
  init = 0,
  success = 1,
  error = -1,
}

export enum imgDisplayStatus {
  show =  'block',
  hidden = 'none',
}

export enum resetTypeMap {
  auto = 'auto',
  manual = 'manual',
}

export enum positionStringMap {
  top =  'top',
  bottom = 'bottom',
}

export enum resetButtonMap {
  none = 'none',
  inline = 'inline',
  outline = 'outline',
}

export enum displayTypeMap {
  hover = 'hover',
  static = 'static',
}

export type robotValidateConfig =  {
  offsetY: number,
  handler: () => any,
};

export interface IProps {
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

export interface IState {
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
