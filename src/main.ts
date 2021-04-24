'use strict';

import http from 'http';
import * as miniApi from './miniApi';

const host = 'localhost';
const port = 9006;

const requestListener = async function (req: any, res: any) {
  console.log('req', req);

  await miniApi.procRequestDefault(req);
  await miniApi.procResponseDefault(res);

  console.log('res', res);
};

const server = new http.Server(requestListener);

server.listen(port, host);