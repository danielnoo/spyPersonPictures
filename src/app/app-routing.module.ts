import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/login/game/game.component';
import {CreateComponent} from "./components/create/create.component";

const routes: Routes = [
  { path: 'game/:id', component: GameComponent },
  {path: '', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
