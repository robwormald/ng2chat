import {Component, Template, Foreach} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {SailsIOClient} from '../services/SailsIOClient';
import {ChatManager, Channel} from '../services/ChatManager';

const SERVER_URL = 'http://angular-sails-chat.herokuapp.com/';



@Component({
  selector: 'chat-app',
  services: [
    bind(SailsIOClient).toValue(new SailsIOClient(SERVER_URL)),
    ChatManager]
})
@Template({
  url: 'src/components/chat-app.html',
  directives: [Foreach]
})
export class ChatApp {

  selectedChannel: Channel;

  constructor(chatManager: ChatManager){
    this.title = 'AngularChat';
    this.chatManager = chatManager;
    this.selectedChannel = {messages:[]};
    this.chatManager.loadChannels()
    .then((channels)=> {
      this.channels = channels;
      this.selectedChannel = channels[0] || {};
    });
  }
}
