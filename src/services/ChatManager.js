import {SailsIOClient} from './SailsIOClient';
import {Inject} from 'angular2/di';

export class Channel {
  constructor(channel: any){
    this.id = channel.id;
    this.channel_name = channel.channel_name;
    this.messages = [];
  }

  update(values){
    this.channel_name = values.channel_name;
  }
}

class ChannelList {
  constructor(channels=[]){
    this.channels = channels;
  }

  insert(rawChannels){
    rawChannels.map((rawChannel) =>  {
      let channel = this.channels.find((c) => (c.id === rawChannel.id));
      if(!channel){
        channel = new Channel(rawChannel);
        this.channels.push(channel);
      }
      channel.update(rawChannel);
      return channel;
    });
    return this.channels;
  }

  onChannelEvent(message:any){
    console.info('channel:: ',message);
  }

  onMessageEvent(message:any){
    console.info('message:: ',message);
  }
}


export class ChatManager {
  constructor(sails: SailsIOClient){
    this.sails = sails;
    this.channels = new ChannelList([]);

    this.sails.listen('channel',this.channels.onChannelEvent);
    this.sails.listen('message',this.channels.onMessageEvent);
  }

  loadChannels(){
    return this.sails.connect()
    .then(() => {
      return this.sails.get('/channel');
    })
    .then((channels) => this.channels.insert(channels));
  }

  onChannelEvent(message:any){
    console.log(message);
  }

  onMessageEvent(message:any){
    console.log(message);
  }

}
