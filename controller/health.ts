import * as Decors from 'koa-router-swagger-decorators';

@Decors.tagsAll(['Health'])
@Decors.prefix('/health')
export default class Health {
  @Decors.request(Decors.GET, '/ping')
  @Decors.summary('check service health.')
  static async handler(/* ctx */) {
    return 'pong!'
  }
}
