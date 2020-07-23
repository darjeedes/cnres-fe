import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cnres-fe';


  constructor(public authService: AuthService) {
  }

  onRefreshClick() {
    this.authService.refreshAuthState();
  }
}
