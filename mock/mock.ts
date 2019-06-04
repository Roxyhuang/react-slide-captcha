import * as bg00 from './statics/img/bg00.png';
import * as bg01 from './statics/img/bg01.png';
import * as bg02 from './statics/img/bg02.png';
import * as bg03 from './statics/img/bg03.png';
import * as bg04 from './statics/img/bg04.png';
import * as puzzle00 from './statics/img/puzzle00.png';
import * as puzzle01 from './statics/img/puzzle01.png';
import * as puzzle02 from './statics/img/puzzle02.png';
import * as puzzle03 from './statics/img/puzzle03.png';
import * as puzzle04 from './statics/img/puzzle04.png';

const bgMap = [
  {bg: bg00, puzzle: puzzle00  },
  {bg: bg01, puzzle: puzzle01  },
  {bg: bg02, puzzle: puzzle02  },
  {bg: bg03, puzzle: puzzle03  },
  {bg: bg04, puzzle: puzzle04  },
];

const getRandomStr = ():number => {
  return Math.floor((Math.random()*3) + 1);
};

const validate = async ({id, distance}) => {
  let percentage = parseFloat(distance);
  let matched: boolean = false;
  switch (id) {
    case 0 :
      matched = percentage > 0.42 && percentage < 0.52; // 0.47
      break;
    case 1:
      matched = percentage > 0.28 && percentage < 0.38; // 0.33
      break;
    case 2:
      matched = percentage > 0.75 && percentage < 0.85; // 0.80
      break;
    case 3:
      matched = percentage > 0.33 && percentage < 0.43; // 0.38
      break;
    case 4:
      matched = percentage > 0.80 && percentage < 0.90; // 0.85
      break;
  }

  return matched ? JSON.stringify({code: 100}) : JSON.stringify({code: -100});
};

const getPuzzle = async () => {
  const num = getRandomStr();
  const bg = bgMap[num].bg;
  const puzzle = bgMap[num].puzzle;
  return JSON.stringify({id: num, bgUrl: bg, puzzleUrl: puzzle})
};

export { getPuzzle, validate }


