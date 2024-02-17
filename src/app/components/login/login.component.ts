import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {FirebaseService} from "../../../../services/firebase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalPlayerData} from "../../../../models/models";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  isLoginDisplayed = true;
  isGameDisplayed = false;

  playerName: string = '';
  isNameValid: boolean = false;
  username: string;
  gameName: string;

  private _localPlayerData: User;
  constructor(private _firebaseService: FirebaseService, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit() {
    this.gameName = this._router.url.split('/').pop();

    // check local storage to see if there is a name stored for this game
    // come back to this problem
    console.log('game name set from route in game component', this.gameName);
    this.lookForNameInLocalStorage()
      // .pipe(
      //   switchMap((username) => {
      //     this.username = username;
      //     return this._firebaseService
      //       .getGameData(this.gameData.name)
      //       .snapshotChanges()
      //       .pipe();
      //   })
      // )
      .subscribe((data) => {
        console.log(data);
        // set gamedata from here
        // ideally figure out how to query the db for our specific game
      });
  }

  validatePlayerName() {
    const pattern = /^[a-zA-Z0-9]{3,}$/;
    this.isNameValid = pattern.test(this.playerName);
  }

  joinGame() {
    if (this.isNameValid) {
      console.log('Game created for:', this.playerName);

      // set name to localstorage under gamename object
      localStorage.setItem('gamename', this.gameName)
      localStorage.setItem('playername', this.playerName)
      localStorage.setItem('teamname', 'spec')

    }
  }

  lookForNameInLocalStorage(): Observable<string> {
    return new Observable<string>((subscriber) => {
      if (localStorage.getItem(this.gameName)) {
        subscriber.next(localStorage.getItem(this.gameName));
        subscriber.complete();
      } else {
        subscriber.next(null);
        subscriber.complete();
      }
    });
  }
}
