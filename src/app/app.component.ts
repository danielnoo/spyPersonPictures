import { Component } from '@angular/core';
import { WebSocketService } from 'services/websocket.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spypersonpictures';
  liveData$!: Observable<any>
  
  constructor(private webSocketService: WebSocketService) {
    console.log('starting up');
    
    this.webSocketService.connect();
  }
  ngOnInit() {
    console.log('init');
    
   this.liveData$ = this.webSocketService.messages$.pipe(
      map((rows: { data: any; }) => {
          console.log(rows.data);
          
        return rows.data
      } ),
      catchError((error: any) => { throw error }),
      tap({
        error: (error: any) => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed')
      }
      )
    );

    
  }

  onMessageClick() {
    console.log('button pressed , sending messagge');
    this.webSocketService.sendMessage('helllllllo')

  }
}
