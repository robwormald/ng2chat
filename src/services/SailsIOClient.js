import io from 'automattic/socket.io-client/socket.io';

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

  constructor(url: string,options:any){
    this.url = `${url}?${SAILS_SDK_VERSION_KEY}=${SAILS_SDK_VERSION_VALUE}`;
    this.options = options;
    this.eventListeners = new Map();
    this.openConnection = null;
  }

  connect(){
    if(!this.openConnection){
      this.openConnection = new Promise((resolve,reject)=> {
        let socket = io(this.url,this.options);
        socket.on(CONNECT_EVENT,()=> resolve(socket));
        socket.on(CONNECT_ERROR_EVENT,(err)=>reject(err));
      });
    }

    return this.openConnection;
  }

  sendRequest(request:SailsIORequest){
    return this.connect()
    .then((socket) => request.sendWithSocket(socket))
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

  listen(eventName:string, callback:Function){
    this.connect()
    .then((socket) => socket.on(eventName,callback));
  }
}
