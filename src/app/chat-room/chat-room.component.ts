import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../chat';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @Input() chat: Chat;

  message: string;

  constructor() { }

  ngOnInit() {
    this.chat = {
      id: 1,
      name: 'chat ejemplo',
      messages: ['Prueba1', 'Prueba2', 'Prueba3']
    };
  }

  sendMessage() {
    console.log('Sending message...');
  }

}
