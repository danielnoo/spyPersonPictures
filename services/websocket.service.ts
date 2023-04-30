import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment.development';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject<Observable<any>>();
  public messages$: Observable<any> = this.messagesSubject$.pipe(switchAll(), catchError((e: any) => { throw e }));

  public connect(): void {
    console.log(' runnign this');
    

    this.socket$ = new WebSocketSubject('ws://localhost:7000');
    this.socket$.subscribe((data) => {
      console.log(data);
      
    })
    // if (!this.socket$ || this.socket$.closed) {
    //   console.log('creating connection in service');
      
    //   this.socket$ = new WebSocketSubject('ws://localhost:7000');
    //   const messages = this.socket$.pipe(
    //     tap({
    //       error: error => console.log(error),
    //     }), catchError(_ => EMPTY));
    //   this.messagesSubject$.next(messages);
    // }
  }

  private getNewWebSocket() {
    return webSocket({url: environment.wsEndpoint});
  }
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete();
  }
}