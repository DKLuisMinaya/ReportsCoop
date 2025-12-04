import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {Sidebar} from './pages/sidebar/sidebar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webReports');

  definicionesOpen = false;

toggleDefiniciones() {
  this.definicionesOpen = !this.definicionesOpen;
}
}
