import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase.service';
import { Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { GameData } from '../../../../models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  isLoginDisplayed: boolean;
  username: string;
  gameData: GameData = {};
  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.gameData.name = this._router.url.split('/').pop();

    // check local storage to see if there is a name stored for this game
    console.log(this._router.url);
    this.lookForNameInLocalStorage()
      .pipe(
        switchMap((username) => {
          this.username = username;
          return this._firebaseService
            .getGameData(this.gameData.name)
            .snapshotChanges()
            .pipe();
        })
      )
      .subscribe((data) => {
        console.log(data);
        // set gamedata from here
        // ideally figure out how to query the db for our specific game
      });
  }

  lookForNameInLocalStorage(): Observable<string> {
    return new Observable<string>((subscriber) => {
      if (localStorage.getItem(this.gameData.name)) {
        subscriber.next(localStorage.getItem(this.gameData.name));
        subscriber.complete();
      } else {
        this.isLoginDisplayed = true;
        subscriber.next(null);
        subscriber.complete();
      }
    });
  }
}
