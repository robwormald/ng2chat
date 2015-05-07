import {bootstrap, Component, View} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {ChatChannelList} from './chat-channel-list';
import {ChatChannelViewer} from './chat-channel-viewer'
import {ChatStore, Channel} from '../services/ChatStore';

import {SailsIOClient, SailsIOConfig} from '../services/SailsIOClient';

const SERVER_URL = 'http://localhost:1337/';

@Component({
  selector: 'chat-app',
  injectables: [
    ChatStore,
    SailsIOClient,
    bind(SailsIOConfig).toValue({url: SERVER_URL})
    ],
    // properties: {
  //    'selectedChannel': 'selectedChannel'
  //  }
})
@View({
  template: 'hello world',
  directives: [
  //  ChatChannelList,
  //  ChatChannelViewer
  ]
})
export class ChatApp {

  selectedChannel: Channel;

  constructor(chatStore: ChatStore){

    console.log('go')
    this.title = 'AngularChat';
    this.selectedChannel = {};
    this.chatStore = chatStore;
  }
}

export const main = () => {
  return bootstrap(ChatApp);

}
