import * as Koa from 'koa';
import { Context } from 'koa'
import * as kcors from 'kcors';
import * as bodyParser from 'koa-bodyparser';
import { Server } from 'http'

const path = require('path');

const router = require('koa-router')();

const staticServer = require("koa-static");

const data = {
  async getData(ctx: Context): Promise<void> {
    ctx.body = JSON.stringify({test: 1111});
  },
  async getPuzzle(ctx: Context) : Promise<void> {
    ctx.body = JSON.stringify({bgUrl: 'http://localhost:5000/bg.jpg', puzzle: 'http://localhost:5000/puzzle.jpg'});
  }
};

router.post('/data', data.getData);
router.post('/getPuzzle', data.getPuzzle);

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
      // console.log(`Server listening on ${Environment.port}, in ${Environment.identity} mode.`)
    });
    return server
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
})();







