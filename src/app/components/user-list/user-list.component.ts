import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Amplify, Auth} from 'aws-amplify';
import {API} from '@aws-amplify/api';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: string[] = null;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.http.get<string[]>('https://uxkhqt800h.execute-api.eu-central-1.amazonaws.com/noauth', {}).subscribe(response => {
    //   console.log(response);
    //   this.users = response;
    // }, error => {
    //   console.error(error);
    // });
    //
    // console.log(Amplify);

    API.configure({});
    console.log(this.authService.getToken());


    API.get('user-api-rest', '/users', {}).then(response => {
      console.log(response);
      this.users = response;
    }, error => {
      console.error(error);
    });
  }

}
