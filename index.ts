import * as path from 'path';
import Koa, { ParameterizedContext, Context } from 'koa';
import router from './router';
import KoaLogger from 'koa-logger';
import KoaBody from 'koa-body';
import BodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

const app = new Koa();

app
  .use(async (ctx: Context, next) => {
    await next();

    if (ctx.body && ctx.body.noWrapper) {
      ctx.body = ctx.body.data;
    }
  })
  .use(KoaLogger())
  .use(KoaBody({multipart: true, parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE']}))
  .use(BodyParser())
  .use(helmet())
  .use(router.routes())
  .use(router.allowedMethods({
    throw: true,
  }));

const server = app.listen(process.env.PORT || 8119);
const addr = server.address()
const port = typeof addr === 'string' ? addr : (addr && addr.port);

console.log(`Server run at ${ port }`);
