import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../../services/firebase.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {GameData} from '../../../../models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  isLoginDisplayed = true;
  username: string;
  gameData: GameData = {};
  gameName: string;
  game$: Observable<GameData>
  spectatorsList: string[];
  redList: string[];
  blueList: string[]

  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.gameName = this._router.url.split('/').pop();
    this._firebaseService.getGameByName(this.gameName).subscribe((gameData) => {
      console.log(gameData, 'logging game data changes from game component')
      this.gameData = gameData
      this.spectatorsList = this.gameData.players.filter((player) => player.team === 'spec').map((user) => user.name)
      this.redList = this.gameData.players.filter((player) => player.team === 'red').map((user) => user.name)
      this.blueList = this.gameData.players.filter((player) => player.team === 'blue').map((user) => user.name)
    })
  }

  // private _getGameNameFromRoute() {
  //   console.log(this._route)
  //   this._route.params.subscribe((data) => {
  //     console.log(data)
  //     console.log(data['id'])
  //     if (data['id']) {
  //       this.gameName = data['id']
  //       console.log('gamename set in game component:', this.gameName)
  //     }
  //     this._firebaseService.getGameByName(this.gameName).subscribe((gameData) => {
  //       console.log(gameData, 'logging game data changes from game component')
  //       this.gameData = gameData
  //       this.spectatorsList = this.gameData.players.filter((player) => player.team === 'spec').map((user) => user.name)
  //       this.redList = this.gameData.players.filter((player) => player.team === 'red').map((user) => user.name)
  //       this.blueList = this.gameData.players.filter((player) => player.team === 'blue').map((user) => user.name)
  //     })
  //   })
  // }

  makeUpdate() {
    console.log(this.gameData)
    this._firebaseService.updateGameByKey
    (this.gameData.key, {players: this.gameData.players.concat([{name: 'added by button', team: 'red'}])})
      .then(() => {
      })
  }
}
