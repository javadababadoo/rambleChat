import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { EventsComponent } from './events/events.component';
import { MediaMatcher } from '@angular/cdk/layout';
// import { MessengerService, mqttServiceFactory } from './messenger.service';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';
import { EventLogService } from './event-log.service';
import { MessengerService } from './messenger.service';
import { ChatsComponent } from './chats/chats.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
/* import {
  MqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt'; */


const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    SettingsComponent,
    DashboardComponent,
    PageHeaderComponent,
    ChatsComponent,
    ChatRoomComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MediaMatcher,
    MessengerService,
    EventLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
