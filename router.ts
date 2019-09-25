import * as fs from 'fs';
import * as path from 'path';
import * as KoaRouter from 'koa-router';
import createRouter, { HttpStatusError } from 'koa-router-swagger-decorators';
import { Context } from 'koa';

let pkgFile = path.resolve(__dirname, './package.json');
let pkg: any = {};

if (fs.existsSync(pkgFile)) {
  pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
}

async function beforeController (/* ctx */) {
  // let url = ctx.path;
  // throw new HttpStatusError(401, 'unauthenticated');
}

async function afterController (/*ctx: Context */) {
  // logger.info('start: after router', ctx.url);
}

const router = createRouter({
  controllersDir: path.resolve(__dirname, './controller'),
  packageFile: path.resolve(__dirname, './package.json'),
  beforeController,
  afterController,
  swaggerConfig: {
    // prefix: '/',
    title: `API Doc of ${pkg.name}`,
    description: pkg.description,
    version: pkg.version,
    prefix: '',
    swaggerHtmlEndpoint: '/swagger',
    swaggerJsonEndpoint: '/swagger-json',

    // [optional] additional options for building swagger doc eg. add api_key as
    // shown below
    swaggerOptions: {
      swagger: '2.0',
      securityDefinitions: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      }
    },

    swaggerConfiguration: {
      display: {
        defaultModelsExpandDepth: 4,
        defaultModelExpandDepth: 0,
        docExpansion: 'list',
        defaultModelRendering: 'model'
      }
    }
  },
});

export default router;
