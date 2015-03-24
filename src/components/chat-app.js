import {Component, Template} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {SailsIOClient} from '../services/SailsIOClient';

const SERVER_URL = 'http://angular-sails-chat.herokuapp.com/';

@Component({
  selector: 'chat-app',
  services: [bind(SailsIOClient).toValue(new SailsIOClient(SERVER_URL))]
})
@Template({
  url: 'src/components/chat-app.html'
})
export class ChatApp {

  constructor(chatClient: SailsIOClient){
    this.title = 'AngularChat';
    this.chatClient = chatClient;
    this.chatClient.connect()
    .then(()=>{
      return this.chatClient.get('/channel')
    })
    .then((res)=> {
      console.log(res)
    })
  }
}
