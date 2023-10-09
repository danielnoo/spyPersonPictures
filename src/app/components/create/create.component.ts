import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {nameByRace} from "fantasy-name-generator";
import {FirebaseService} from "../../../../services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  playerName: string = '';
  isNameValid: boolean = false;
  newGameName: string;

  constructor(private _firebaseService: FirebaseService, private _router: Router) {}

  ngOnInit() {
    console.log('init');
    this.newGameName = `${nameByRace('elf', { gender: 'female' })}-${nameByRace(
      'cavePerson',
      { gender: 'female' }
    )}`;
    console.log(this.newGameName);
  }




  validatePlayerName() {
    const pattern = /^[a-zA-Z0-9]{3,}$/;
    this.isNameValid = pattern.test(this.playerName);
  }

  createGame() {
    this._firebaseService.createGame({ name: this.newGameName, players: [] });
    this._router.navigate([`/game/${this.newGameName}`]);
  }
}
