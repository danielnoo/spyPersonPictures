import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  @Input() spectators: string[]
  @Input() redList: string[]
  @Input() blueList: string[]


  // this component will display players online
  // there should be a list of players that haven't joined a team
  // there should be one list for the red team and one for the blue team
  // will probably try to keep this component dumb
}
