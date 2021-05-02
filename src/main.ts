'use strict';

import http from 'http';
import * as miniApi from './miniApi';

const host = 'localhost';
const port = 9006;

const requestListener = async function (req: any, res: any) {
  let resp = await miniApi.procRequestDefault(req, res);
  resp = (resp)?resp:'';
  await miniApi.procResponseDefault(res, resp);
};

const server = new http.Server(requestListener);

server.listen(port, host);
console.log('Сервер запущен, адрес ' + host +':'+ port);