import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject,} from '@angular/fire/compat/database';
import {GameData, User} from 'models/models';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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

  getAllGameData(gameName: string): AngularFireList<GameData> {
    return this._gameList;
  }

  createUser(user: User) {
    return this._userList.push(user);
  }

  createGame(game: GameData) {
    return this._gameList.push(game);
  }

  getGameByNameOld(gameName: string): Observable<GameData[]> {
    return this.db.list<GameData>(this._gamePath, ref =>
      ref.orderByChild('name').equalTo(gameName)
    ).valueChanges();
  }

  getGameByName(gameName: string): Observable<GameData> {
    return this.db.list<GameData>(this._gamePath, ref =>
      ref.orderByChild('name').equalTo(gameName).limitToFirst(1)
    ).snapshotChanges().pipe(
      map(changes => {
        const game = changes[0].payload.val() as GameData;
        const key = changes[0].payload.key;
        return {key, ...game};
      })
    );
  }

  // subscribeToGameChanges(gameKey: string): Observable<GameData> {
  //   return this.db.object<GameData>(`${this._gamePath}/${gameKey}`).valueChanges();
  // }

  updateGameByKey(gameKey: string, newData: Partial<GameData>): Promise<void> {
    return this.db.object(`${this._gamePath}/${gameKey}`).update(newData);
  }
}
