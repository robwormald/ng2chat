import {Component, View, For, If} from 'angular2/angular2';
import {Channel, ChatStore} from '../services/ChatStore';


@Component({
	selector: 'chat-message-list',
	injectables: []
})
@View({
	template: `
		<div>hello world</div>
	`,
	directives: [If]
})
export class ChatMessageList {

	chatStore: ChatStore;

	constructor(chatStore:ChatStore){
		this.chatStore = chatStore;
	}
}
