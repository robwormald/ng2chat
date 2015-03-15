import {bind} from 'angular2/di';
import io from 'automattic/socket.io-client/socket.io';

export class ChatClient {
  constructor(url: string,options:any){
    this.url = url;
    this.options = options;
    this.openConnection = null;
  }

  connect(){
    if(!this.openConnection){
      this.openConnection = new Promise((resolve,reject)=> {
        let socket = io(this.url,this.options);
        socket.on('connect',()=> resolve(socket));
        socket.on('connectionError',(err)=>reject(err));
      });
    }
    return this.openConnection;
  }


}
