'use strict';

import https from 'https';
// import http from 'http';
// import Axios from 'axios';

// серверные настройки и то что клиенту знать не обязательно
const myDomen = '*';
/** идентификтаор приложения гитхаб */
// const APP_ID:String = 'c5854afba787a9e4a397';
/** идентификтаор клиентского приложения */
const CLIENT_ID:String = '2db9bbe82e963db416698f664506769dfa5a1b1f';


// ответы

/** действия с ответом по-умолчанию */
export function procResponseDefault(res: any):void{
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Method', 'POST');
  res.setHeader('Access-Control-Allow-Origin', myDomen);

  const body = 'Sorry, don\'t wor11k';
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain',
  })
  .end(body);
}

//запросы

/** действия с запросом по-умолчанию */
export async function procRequestDefault(req: any):Promise<void>{
  if(req.method &&  req.method.toString().toUpperCase() == 'POST' ){
     const resp = await procRequestPost(req, (_res:string):string => {
        // console.log('test11');
        return _res;
      });
    //  console.log('resp', resp);
  }
}

/** действия с запросом POST */
async function procRequestPost(req: any, func_callback: (res:string)=>string ):Promise<void>{
  let body = '';
  req.on('data', (chunk:string) => {
      // console.log('data');
      body += chunk.toString();
  });

  req.on('end', () => {
    // console.log('func_callback',body);
    func_callback(body);
    // return body;
    if(req.headers && checkHeader(req.headers, 'content-type', 'application/json'))
    {
      // return body;
      getTokenGitHub(body);
    }
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
  // console.log('_param', _param);
  const par = JSON.parse( _param);

  if(par.url&&par.client_id&&par.code){
    const opt = {
      method: 'POST',
    };

    const url = par.url + `?client_id=${par.client_id}`
        +`&client_secret=${CLIENT_ID}`
        +`&code=${par.code}`;

    // const postData = {
    //   client_id: par.client_id,
    //   code: par.code,
    //   client_secret: CLIENT_ID,
    //   url: par.url,
    // };

    // const axios = Axios.create();
    // const res = await axios.post( par.url, postData)
    //   .then( (resp) => { return resp; })
    //   .catch(function (error) {console.log('res', error);});
    // console.log('res axios', res);
    // const res1 = await axios.post( 'http://localhost:9016/', postData)
    //   .then( (resp) => { return resp; })
    //   .catch(function (error) {console.log('res1',error);});
    // console.log('res1 axios', res1);

    const req = https.request(url, opt, getTokenGitHub_callback);
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();

    // const req1 = https.request(par.url, opt, getTokenGitHub_callback);
    // req1.on('error', (e) => {
    //   console.error(`problem with request: ${e.message}`);
    // });
    // req1.write( JSON.stringify(postData) );
    // req1.end();

    // const req = http.request('http://localhost:9016/', opt, getTokenGitHub_callback);
    // req.on('error', (e) => {
    //   console.error(`problem with request: ${e.message}`);
    // });
    // req.write( JSON.stringify(postData) );
    // req.end();

  }

  return '';
}

function getTokenGitHub_callback(res: any){
  let _body = '';
  res.on('data', (chunk:string) => {
    _body += chunk;
  });
  res.on('end', () => {
    console.log('_body', _body);
    console.log('_res', res);
  });
}

function sleep(ms:number)
{
  const date = Date.now();
  let curDate = Date.now();
  do { curDate = Date.now(); }
  while(curDate -date < ms);
}