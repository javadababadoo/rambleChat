import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { EventsComponent } from './events/events.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { MessengerService } from './messenger.service';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'chat-rooms', component: ChatRoomComponent },
  { path: 'events', component: EventsComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    SettingsComponent,
    DashboardComponent,
    ChatRoomComponent,
    PageHeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MediaMatcher, MessengerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
