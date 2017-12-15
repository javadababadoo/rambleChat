import { MessengerService } from './../messenger.service';

import { Component, OnInit } from '@angular/core';
import { MessengerConfig } from '../messenger-config';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  messengerConfig: MessengerConfig;
  pageName = 'Settings';

  constructor(private messengerService: MessengerService, public snackBar: MatSnackBar) {
    this.messengerConfig = messengerService.getMessengerConfig();
  }

  ngOnInit() {
  }

  saveMessengerConfig() {
    console.log('Saving configuration...');
    this.messengerService.saveMessengerConfig(this.messengerConfig);
    this.snackBar.open('Saved configuration', '', {
      duration: 3000
    });
  }
}
