import {Component, View, For} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {ChatStore, Channel} from '../services/ChatStore';


@Component({
	selector: 'chat-channel-list',
	injectables: [ChatStore],
	properties: {
		'selectedChannel': 'selectedChannel'
	}
})
@View({
	directives: [For],
	template: `

	<div class="container flex">
		<h4>Channels</h4>
		<div *for="#channel of chatStore.channels">
			<button (click)="selectChannel(channel)" [disabled]="selectedChannel == channel">{{channel.name}}</button>
		</div>
	<div>

	`
})
export class ChatChannelList {

	constructor(chatStore:ChatStore){
		this.chatStore = chatStore;
	}
	selectChannel(channel:Channel){
		this.selectedChannel = channel;
	}
}
