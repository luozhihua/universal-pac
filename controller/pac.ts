import * as fs from 'fs';
import * as path from 'path';
import * as Decors from 'koa-router-swagger-decorators';
import { Context } from 'koa';
import { HttpResponse } from 'koa-router-swagger-decorators';

@Decors.tagsAll(['Universal Pac'])
@Decors.prefix('/pac')
export default class UniversalPac {
  @Decors.request(Decors.GET, '/:host/:port/universal.pac')
  @Decors.summary('Get pac file.')
  static async universalPacContent(ctx: Context) {
    const template:string = fs.readFileSync(path.resolve(__dirname, '../template.pac'), 'utf8');
    const {host='127.0.0.1', port = 8119} = ctx.params;

    return new HttpResponse({
      data: template.replace(/\$HOST/g, host).replace(/\$PORT/g, port),
      noWrapper: true,
    });
  }
}
