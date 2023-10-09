import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../../services/firebase.service';
import { Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { GameData } from '../../../../../models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  isLoginDisplayed = true;
  username: string;
  gameData: GameData = {};
  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router
  ) {}

  ngOnInit() {}


}
