import * as Koa from 'koa';
import { Context } from 'koa'
import * as kcors from 'kcors';
import * as bodyParser from 'koa-bodyparser';
import { Server } from 'http'

const path = require('path');

const router = require('koa-router')();

const staticServer = require("koa-static");

const bgMap = [
  {bg: 'http://localhost:5000/bg.jpg', puzzle: 'http://localhost:5000/puzzle.png' },
  {bg: 'http://localhost:5000/bg01.png', puzzle: 'http://localhost:5000/puzzle01.png' },
  {bg: 'http://localhost:5000/bg02.png', puzzle: 'http://localhost:5000/puzzle02.png' },
  {bg: 'http://localhost:5000/bg03.png', puzzle: 'http://localhost:5000/puzzle03.png' },
  {bg: 'http://localhost:5000/bg04.png', puzzle: 'http://localhost:5000/puzzle04.png' },
];

const getRandomStr = ():number => {
  return Math.floor((Math.random()*4) + 1);
};

const validate =(id, distance):object => {
  let percentage = parseFloat(distance);
  let matched: boolean = false;
  switch (id) {
    case 0 :
      matched = percentage > 0.37 && percentage < 0.47;
      break;
    case 1 :
      matched = percentage > 0.42 && percentage < 0.46;
      break;
    case 2:
      matched = percentage > 0.26 && percentage < 0.47;
      break;
    case 3:
      matched = percentage > 0.80 && percentage < 0.84;
      break;
    case 4:
      matched = percentage > 0.32 && percentage < 0.38;
      break;
  }

  return matched ? {code: 100} : {code: -100};
};



const data = {
  async validate(ctx: Context): Promise<void> {
    const body = ctx.request.body;
    const id = body.id;
    const distance = body.distance;
    const res = validate(id, distance);
    ctx.body = JSON.stringify(res);
  },
  async getPuzzle(ctx: Context) : Promise<void> {
    const num = getRandomStr();
    const bg = bgMap[num].bg;
    const puzzle = bgMap[num].puzzle;
    //
    // console.log(bg);
    // console.log(puzzle);

    ctx.body = JSON.stringify({id: num, bgUrl: bg, puzzleUrl: puzzle});
  }
};

router.post('/getPuzzle', data.getPuzzle);
router.post('/validate', data.validate);

const  createServer = async(): Promise<any> => {

  const app = new Koa();

  app.use(kcors());

  app.use(bodyParser());

  app.use(staticServer(path.join(__dirname, '.', 'statics/img')));

  app.use(router.routes()).use(router.allowedMethods());

  return app
};

export default (async() => {
  try {
    const app = await createServer();
    const server: Server = app.listen(5000, () => {
      console.log(5000);
    });
    return server
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
})();







