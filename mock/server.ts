import * as Koa from 'koa';
import { Context } from 'koa'
import * as kcors from 'kcors';
import * as bodyParser from 'koa-bodyparser';
import { Server } from 'http'

const router = require('koa-router')();

const data = {
  async getData(ctx: Context): Promise<void> {
    ctx.body = JSON.stringify({test: 1111});
  },
}

router.post('/data', data.getData);

const  createServer = async(): Promise<any> => {

  const app = new Koa();

  app.use(kcors());

  app.use(bodyParser());

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







