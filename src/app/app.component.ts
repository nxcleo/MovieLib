import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movielib';
  selector = 'movie';
  changeSelect(n) {
    this.selector = n;
  }
}
