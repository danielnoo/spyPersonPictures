import { Component } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from 'services/firebase.service';
import { nameByRace } from 'fantasy-name-generator';
import { User } from 'models/models';
import { LoginComponent } from './components/login/login.component';
import { FormBuilder } from '@angular/forms';

// should create a game and display a shareable link before the button is clicked
// route to game/:id component and display login if no name is found in local storage

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'spypersonpictures';
  players: User[];
  newGameName: string;
  constructor(private firebaseService: FirebaseService) {}
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
    this.firebaseService.createUser({ name: randomName.toString() });
  }

  onGetAllClick() {
    this.firebaseService
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
}
