import { MessengerConfig } from './messenger-config';
import { Injectable } from '@angular/core';
/* import {
  MqttMessage,
  MqttModule,
  MqttService,
  MqttServiceOptions
} from 'ngx-mqtt'; */
import { ConnectionEvent } from './connection-event';
import { Chat } from './chat';
import { ChatMessage } from './chat-message';
import { EventLogService } from './event-log.service';
import {Paho} from 'ng2-mqtt';

/* export const MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
  hostname: 'm14.cloudmqtt.com',
  port: 32588,
  connectOnCreate: false,
  username: 'ldolhenx',
  password: 'JG7184o10Ay5',
  protocol: 'wss',
  clientId: '1234',
  path: '/mqtt'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
} */

@Injectable()
export class MessengerService {

  private _client: Paho.MQTT.Client;
  messengerConfig: MessengerConfig;
  private chatRoomsMap: Map<number, Chat> = new Map();
  public chatRooms: Chat[] = [];

  constructor(
    // private _mqttService: MqttService,
    private eventLog: EventLogService) {

  }

  saveMessengerConfig(messengerConfig) {
    this.messengerConfig = messengerConfig;
    localStorage.setItem('messengerConfig', JSON.stringify(this.messengerConfig));
  }

  getMessengerConfig() {
    const messengerConfig = localStorage.getItem('messengerConfig');
    if (messengerConfig == null) {
      this.messengerConfig = {
        hostname: 'm14.cloudmqtt.com',
        port: 9001,
        username: 'ldolhenx',
        password: 'JG7184o10Ay5',
        displayName: `user_${Math.floor(Math.random() * 99) + 1}`,
        chatName: 'general',
        chatId: 1,
        suscribed: false
      };
    } else {
      this.messengerConfig = JSON.parse(messengerConfig);
    }
    return this.messengerConfig;
  }

  public configureConnection(): void {
   /*  MQTT_SERVICE_OPTIONS.hostname = this.messengerConfig.hostname;
    MQTT_SERVICE_OPTIONS.port = this.messengerConfig.port;
    MQTT_SERVICE_OPTIONS.username = this.messengerConfig.username;
    MQTT_SERVICE_OPTIONS.password = this.messengerConfig.password; */
    console.table(this.messengerConfig);
    const clientID = 'ID-' + Math.round(Math.random() * 1000);
    this._client = new Paho.MQTT.Client(this.messengerConfig.hostname, this.messengerConfig.port, clientID);
  }

  public reconnect(): void {
    if (this._client.isConnected()) {
      this._client.disconnect();
    }

    this._client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost -> ' + responseObject);
    };

    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived -> ');
      console.log(message);

      if (message.destinationName === 'connectionEvent/') {
        this.onConnectionEvent(message);
      }
    };

    this._client.connect({ onSuccess: this.onConnected.bind(this) });


    /* this._mqttService.connect(MQTT_SERVICE_OPTIONS);

    if (!this.messengerConfig.suscribed) {
      this.suscribeToTopics();
    }

    this._mqttService.onError.subscribe(evt => console.log(`mqtt on error: ${evt}`));
    this._mqttService.onClose.subscribe(evt => console.log(`mqtt on close: ${evt}`));
    this._mqttService.onConnect.subscribe(evt => console.log(`mqtt on connect: ${evt}`));
    this._mqttService.onReconnect.subscribe(evt => console.log(`mqtt on reconnect: ${evt}`));
    this._mqttService.onSuback.subscribe(evt => console.log(`mqtt on suback: ${evt}`)); */
  }

  onConnectionEvent(message: Paho.MQTT.Message) {

    try {
      const connectionEvent: ConnectionEvent = JSON.parse(
        message.payloadString
      );

      if (connectionEvent.alive && this.chatRoomsMap.get(connectionEvent.chatId) === undefined) {
        const chat: Chat = {
          id: connectionEvent.chatId,
          messages: [],
          name: connectionEvent.chatName
        };
        this.chatRoomsMap.set(connectionEvent.chatId, chat);
        this.chatRooms.push(chat);
      } else {
        this.chatRoomsMap.delete(connectionEvent.chatId);
        const chatIndex = this.chatRooms.findIndex((chat: Chat, index: number, array: Chat[]) => {
          return chat.id === connectionEvent.chatId;
        });
         if (chatIndex  !== -1) {
           this.chatRooms.splice(chatIndex, 1);
         }
      }
    } catch (error) {
      this.eventLog.appendLog(`received message from connectionEvent/ topic could not be proccessed: ${message.payloadString}`);
    }

  }

  private onConnected(): void {
    console.log('Connected to broker.');
    if (!this.messengerConfig.suscribed) {
      this.suscribeToTopics();
    }
    this.register('connectionEvent/');
  }

  suscribeToTopics(): void {
    this._client.subscribe('connectionEvent/',
    {
      qos: 0
    });


    /* this._mqttService.observe('connectionEvent/').subscribe((message: MqttMessage) => {
      try {
        const connectionEvent: ConnectionEvent = JSON.parse(
          message.payload.toString()
        );

        if (connectionEvent.alive && this.chatRoomsMap.get(connectionEvent.chatId) === undefined) {
          const chat: Chat = {
            id: connectionEvent.chatId,
            messages: [],
            name: connectionEvent.chatName
          };
          this.chatRoomsMap.set(connectionEvent.chatId, chat);
          this.chatRooms.push(chat);
        } else {
          this.chatRoomsMap.delete(connectionEvent.chatId);
          const chatIndex = this.chatRooms.findIndex((chat: Chat, index: number, array: Chat[]) => {
            return chat.id === connectionEvent.chatId;
          });
           if (chatIndex  !== -1) {
             this.chatRooms.splice(chatIndex, 1);
           }
        }
      } catch (error) {
        this.eventLog.appendLog(`received message from connectionEvent/ topic could not be proccessed: ${message.payload.toString()}`);
      }

    });

    this._mqttService.observe('chat/+/').subscribe((message: MqttMessage) => {
      try {
        const chatMessage: ChatMessage = JSON.parse(
          message.payload.toString()
        );

        let chat = this.chatRoomsMap.get(chatMessage.chatId);
        if (chat === undefined) {
          chat = {
            id: chatMessage.chatId,
            messages: [],
            name: chatMessage.chatName
          };
          this.chatRoomsMap.set(chat.id, chat);
          this.chatRooms.push(chat);
        }
        chat.messages.unshift(`${chatMessage.sender}: ${chatMessage.msg}`);
      } catch (error) {
        this.eventLog.appendLog(`received message from chat/+/ topic could not be proccessed: ${message.payload.toString()}`);
      }

    });

    this.messengerConfig.suscribed = true; */
  }

  public register(destinationName: string): void {
    const message = new Paho.MQTT.Message(JSON.stringify({
      alive: true,
      chatName: this.messengerConfig.chatName,
      chatId: this.messengerConfig.chatId
    }));
    message.destinationName = destinationName;

    /* let message: Paho.MQTT.Message;
    message = {
      payloadString: 'test',
      destinationName: 'connectionEvent/',
      qos: 0,
      retained: false,
      duplicate: false
    }; */

    this._client.send(message);
    /* this._mqttService.unsafePublish(
      'connectionEvent/',
      JSON.stringify({
        alive: true,
        chatName: this.messengerConfig.chatName,
        chatId: this.messengerConfig.chatId
      }),
      { qos: 0, retain: false }); */
  }

}
