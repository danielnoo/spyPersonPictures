import { Component } from '@angular/core';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  playerName: string = '';

  isPlayerNameValid(): boolean {
    const regex = /^[a-z0-9]{3,}$/i; // Alphanumeric with at least 3 characters
    return regex.test(this.playerName);
  }

  join(): void {
    console.log('Joining as', this.playerName);
    // Add logic here for the join action
  }
}
