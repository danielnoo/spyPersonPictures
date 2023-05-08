import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/compat/database';
import { User, GameData } from 'models/models';
import { query } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _dbPath = '/users';
  private _gamePath = '/games';
  private _userList: AngularFireList<User>;
  private _gameList: AngularFireList<GameData>;

  user: AngularFireObject<User>;
  constructor(private db: AngularFireDatabase) {
    this._userList = db.list(this._dbPath);
    this._gameList = db.list(this._gamePath);
  }

  getAllUsers(): AngularFireList<User> {
    return this._userList;
  }

  getGameData(gameName: string): AngularFireList<GameData> {
    return this._gameList;
  }

  createUser(user: User) {
    return this._userList.push(user);
  }

  createGame(game: GameData) {
    return this._gameList.push(game);
  }
}
