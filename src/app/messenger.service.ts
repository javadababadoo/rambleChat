import { MessengerConfig } from './messenger-config';
import { Injectable } from '@angular/core';

@Injectable()
export class MessengerService {

  messengerConfig: MessengerConfig;

  constructor() {

  }

  saveMessengerConfig(messengerConfig) {
    this.messengerConfig = messengerConfig;
    localStorage.setItem('messengerConfig', JSON.stringify(this.messengerConfig));
  }

  getMessengerConfig() {
    const messengerConfig = localStorage.getItem('messengerConfig');
    if (messengerConfig == null) {
      this.messengerConfig = {
        hostname: '127.0.0.1',
        port: '9001',
        username: '',
        password: '',
        displayName: `user_${Math.floor(Math.random() * 99) + 1}`,
        chatName: 'general',
        chatId: 0,
        suscribed: false
      };
    } else {
      this.messengerConfig = JSON.parse(messengerConfig);
    }
    return this.messengerConfig;
  }

}
