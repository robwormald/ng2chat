import {bootstrap} from 'angular2/angular2';

import {ChatApp} from './components/chat-app';


export const run = () => {

  console.info('run method start...');
  return bootstrap(ChatApp);
}
