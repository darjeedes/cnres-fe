import {Component, OnInit} from '@angular/core';
import {API} from '@aws-amplify/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: string[] = null;

  constructor() {
  }

  ngOnInit(): void {
    API.get('user-api-rest', '/users', {}).then(response => {
      console.log(response);
      this.users = response;
    }, error => {
      console.error(error);
    });
  }

}
