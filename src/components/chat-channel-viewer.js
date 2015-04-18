import {Component, View, For, If} from 'angular2/angular2';
import {Channel, ChatStore} from '../services/ChatStore';
import {ChatMessageList} from './chat-message-list';


@Component({
	selector: 'chat-channel-viewer',
	injectables: [],
	properties: {
		selectedChannel: 'selectedChannel'
	}
})
@View({
	template: `

		<header>
			<h4 *if="!selectedChannel">Select A Channel</h4>
			<h4 *if="selectedChannel">{{selectedChannel.name}}</h4>
		</header>
		<section>
			<chat-message-list></chat-message-list>
		</section>
		<footer></footer>
	`,
	directives: [If, ChatMessageList]
})
export class ChatChannelViewer {

	chatStore: ChatStore;

	constructor(chatStore:ChatStore){
		this.chatStore = chatStore;
	}
}
