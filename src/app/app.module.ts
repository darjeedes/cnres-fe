import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';

/* Configure Amplify resources */

// Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
