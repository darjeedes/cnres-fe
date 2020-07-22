import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AmplifyAuthenticator} from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: string[] = null;

  public loggedIn = AmplifyAuthenticator;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<string[]>('https://eij66ydkrh.execute-api.eu-central-1.amazonaws.com/users', {}).subscribe(response => {
      console.log(response);
      this.users = response;
    }, error => {
      console.error(error);
    });
  }

}
