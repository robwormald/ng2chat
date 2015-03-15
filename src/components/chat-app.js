import {Component, Template} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {ChatClient} from '../services/chatClient';

@Component({
  selector: 'chat-app',
  services: [bind(ChatClient).toValue(new ChatClient('http://localhost:1337'))]
})
@Template({
  url: 'src/components/chat-app.html'
})
export class ChatApp {

  constructor(chatClient: ChatClient){
    this.title = 'AngularChat';
    this.chatClient = chatClient;
  }

  connect(){
    this.chatClient.connect();
  }
}
