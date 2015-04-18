import io from 'automattic/socket.io-client/socket.io';
import Rx from 'rx/dist/rx.all'

const CONNECT_EVENT = 'connect';
const CONNECT_ERROR_EVENT = 'connectionError';

const SAILS_SDK_VERSION_KEY = '__sails_io_sdk_version';
const SAILS_SDK_VERSION_VALUE = '0.11.0';

const HTTP_METHOD = {
  GET : 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}


const fromSocketEvent = (io, event) => {
  console.log(io)
  return Rx.Observable.fromEventPattern(
    function (h) { return io.on(event, h); },
    function (h, d) { d.removeListener(event, h); }  // Don't know if this is correct, if not, just don't include it
  )
}

export class SailsIOConfig {
  url: string;
}

class SailsIORequest {

  constructor(method: string = HTTP_METHOD.GET, url: string, options: any = {}){
    this.url = url;
    this.method = method;
    this.body = options.body;
  }

  sendWithSocket(socket){
    return new Promise((resolve,reject)=>{
      socket.emit(this.method,this,(rawResponse) => {
        resolve(new SailsIOResponse(rawResponse));
      });
    });
  }
}

class SailsIOResponse {

  constructor(response:any){
    this.status = response.statusCode;
    this.body = response.body;
    this.ok = (response.statusCode < 300);
  }

  json(){
    return this.body;
  }

  validate(){
    if(!this.ok){
      return Promise.reject(new Error(this.statusCode,this.body))
    }
    return this;
  }
}

export class SailsIOClient {

  constructor(config:SailsIOConfig){
    this.url = `${config.url}?${SAILS_SDK_VERSION_KEY}=${SAILS_SDK_VERSION_VALUE}`;
    //this.options = options;
    this.eventListeners = new Map();
    this.socket = io(this.url);
    this.connectionStream = fromSocketEvent(this.socket, 'connect');

    this.connectionStream.forEach((e) => {
      console.log(e)
    })
  }

  sendRequest(request:SailsIORequest){
    return  request.sendWithSocket(this.socket)
    .then((response) => response.validate());
  }

  get(url:string, options: Object){
    let request = new SailsIORequest(HTTP_METHOD.GET,url,options);
    return this.sendRequest(request)
    .then((response)=> response.json());
  }

  post(url: string, body: any, options: any = {}){
    options.body = body;
    let request = new SailsIORequest(HTTP_METHOD.POST,url,options);
    return this.sendRequest(request)
    .then((response)=> response.json());
  }

  put(url: string, body: any, options: any = {}){
    options.body = body;
    let request = new SailsIORequest(HTTP_METHOD.PUT,url,options);
    return this.sendRequest(request)
    .then((response)=> response.json());
  }

  delete(url: string, body: any, options: any = {}){
    options.body = body;
    let request = new SailsIORequest(HTTP_METHOD.DELETE,url,options);
    return this.sendRequest(request)
    .then((response)=> response.json());
  }

  listen(eventName:string){
    return fromSocketEvent(this.socket,eventName);
  }
}
