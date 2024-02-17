import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './components/create/create.component';
import { JoinComponent } from './components/join/join.component';
import { PlayerListComponent } from './components/game/player-list/player-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    CreateComponent,
    JoinComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  exports: [LoginComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
