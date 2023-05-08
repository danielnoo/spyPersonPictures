import { Component, OnInit } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from 'services/firebase.service';
import { nameByRace } from 'fantasy-name-generator';
import { User } from 'models/models';
import { LoginComponent } from './components/game/login/login.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GameData } from 'models/models';

// should create a game and display a shareable link before the button is clicked
// route to game/:id component and display login if no name is found in local storage

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'spypersonpictures';
  players: User[];
  newGameName: string;
  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router
  ) {}
  ngOnInit() {
    console.log('init');
    this.newGameName = `${nameByRace('elf', { gender: 'female' })}-${nameByRace(
      'cavePerson',
      { gender: 'female' }
    )}`;
    console.log(this.newGameName);
  }

  onCreateClick() {
    const randomName = nameByRace('elf', { gender: 'female' });
    this._firebaseService.createUser({ name: randomName.toString() });
  }

  onGetAllClick() {
    this._firebaseService
      .getAllUsers()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.players = data;
      });
  }

  onNewGameClick() {
    this._firebaseService.createGame({ name: this.newGameName, players: [] });
    this._router.navigate([`/game/${this.newGameName}`]);
  }
}
