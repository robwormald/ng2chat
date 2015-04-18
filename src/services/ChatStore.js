import {SailsIOClient} from './SailsIOClient';

import {ListWrapper} from 'angular2/src/facade/collection';


class Channel{
	constructor(channel,messageStream){
		this.id = channel.id;
		this.name = channel.name;
		this.messages = channel.messages.map((message) => new Message(message));

		this.channelStream = messageStream
			.filter((message) => message.data.channel === this.id)
			.subscribe(this.onChannelMessage);
	}

	onChannelMessage(message){
		console.log(message)
	}
}

class Message {
	constructor(messageData){
		this.id = messageData.id;
		this.text = messageData.text;
	}
}

export class ChatStore {

	channels: Array;
	constructor(chatClient: SailsIOClient){

		this.chatClient = chatClient;

		this.channelStream = this.chatClient.listen('message');

		this.chatClient.connectionStream
			.flatMap(() => {
				return this.chatClient.get('/channel');
			})
			.map((channels) => {
				return channels.map((channel) => new Channel(channel,this.channelStream));
			})
			.subscribe((channels) => {
				this.channels = channels;
			});
		//
		// let newMessages = this.messageStream
		// 	.filter((msg) => msg.verb === 'created')
		// 	.map((msg) => new Message(msg.data))
		// 	.subscribe(this.onNewMessage);


	}

	onNewMessage(message){
		console.log(message);
	}

	selectChannel(channel:Channel){
		this.selectedChannel = channel;
	}
}
