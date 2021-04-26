'use strict';

import https from 'https';

// серверные настройки и то что клиенту знать не обязательно
const myDomen = '*';
/** идентификтаор клиентского приложения */
const CLIENT_ID = '2db9bbe82e963db416698f664506769dfa5a1b1f';

// ответы

/** действия с ответом по-умолчанию */
export async function procResponseDefault(res: any, data=''):Promise<void>{
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Method', 'POST');
  res.setHeader('Access-Control-Allow-Origin', myDomen);

  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(data),
    'Content-Type': 'text/plain',
  });
  res.end(data);
}

//запросы

/** действия с запросом по-умолчанию */
export async function procRequestDefault(req: any, res: any):Promise<void|string>{
  if(req.headers && checkHeader(req.headers, 'content-type', 'application/json'))
  {
    if(req.method &&  req.method.toString().toUpperCase() == 'POST' ){
      const body = await procReqGetBody(req);
      return await getTokenGitHub(body);
    }
  }
}

function procReqGetBody(req: any):Promise<string>{
  return new Promise( (resolve, reject)=>{
    let body = '';

    req.on('data', (chunk:string) => {
        body += chunk.toString();
    });

    req.on('end', () => {
      resolve(body);
    });
  });
}

// Общие ф-ии

/** проверяем наличие заголовка */
function checkHeader( _h:any, head:string, _value:string, _separator=';' ):boolean{
  if(_h[head]){
    const headList = _h[head].toString().split(';');

    const res = (headList.findIndex((item:string)=>{
          if(item.toLowerCase() == _value.toLowerCase())
            return true;
          return false;
      }) != -1 ) ? true : false;
    return res;
  }

  return false;
}

/** получение токена по переданным из приложения параметрам */
async function getTokenGitHub(_param:string):Promise<string>{
  const par = JSON.parse( _param);

  if(par.url&&par.client_id&&par.code){
    const opt = {
      method: 'POST',
    };

    const url = par.url + `?client_id=${par.client_id}`
        +`&client_secret=${CLIENT_ID}`
        +`&code=${par.code}`;

    const body:string = await new Promise((resolve, reject )=>{
      const req = https.request(url, opt, async (res)=>{
        let _body = '';
        res.on('data', (chunk:string) => {
          _body += chunk;
        });
        res.on('end', () => {
          resolve(_body);
        });
      });
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      req.end();
    });
    return body;
  }
  return '';
}