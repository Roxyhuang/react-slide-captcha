import * as Koa from 'koa';
import { Context } from 'koa'
import * as kcors from 'kcors';
import * as bodyParser from 'koa-bodyparser';
import { Server } from 'http'

const path = require('path');

const router = require('koa-router')();

const staticServer = require("koa-static");

// const getRandomStr = ():number => {
//
// };

const validate =(id, distance):object => {
  let percentage = parseFloat(distance);
  let matched: boolean = false;
  switch (id) {
    case 1 :
      matched = percentage > 0.37 && percentage < 0.47;
      break;
    case 2:
      matched = percentage > 0.37 && percentage < 0.47;
      break;
  }

  return matched ? {code: 100} : {code: -100};
};



const data = {
  async validate(ctx: Context): Promise<void> {
    const body = ctx.request.body;
    console.log(body);
    const id = body.id;
    const distance = body.distance;
    const res = validate(id, distance);
    ctx.body = JSON.stringify(res);
  },
  async getPuzzle(ctx: Context) : Promise<void> {
    ctx.body = JSON.stringify({id: 1, bgUrl: 'http://localhost:5000/bg.jpg', puzzleUrl: 'http://localhost:5000/puzzle.png'});
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







