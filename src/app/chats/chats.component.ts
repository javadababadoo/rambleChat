import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { Chat } from '../chat';
import { EventLogService } from '../event-log.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  pageName = 'Chat room';

  chatRoomName: string;

  selectedChat: Chat;

  chatRooms = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(private eventLog: EventLogService, public messengerService: MessengerService) { }

  ngOnInit() {
  }

  createChatRoom() {
    console.log('Creating chat room');
  }

  getChatRooms() {
    return this.messengerService.chatRooms;
  }

  onChatSelected(chat: Chat): void {
    console.log('onChatSelected ' + chat.id);
    this.selectedChat = chat;
    this.eventLog.appendLog(`Chat room selected: ${chat.id}=${chat.name}`);
  }


}
