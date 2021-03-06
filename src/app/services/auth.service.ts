import {Injectable} from '@angular/core';
import Amplify, {Auth} from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = false;

  constructor() {

    Amplify.configure({
      Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'eu-central-1:541bd4d2-c793-4387-8792-6c9fe6ffe600',

        // REQUIRED - Amazon Cognito Region
        region: 'eu-central-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-central-1_h77LAdj21',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '6e4c78jcl34pjpavi7r684thnh',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // // OPTIONAL - Configuration for cookie storage
        // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //   domain: '.cnres-fe.s3-website.eu-central-1.amazonaws.com',
        //   // OPTIONAL - Cookie path
        //   path: '/',
        //   // OPTIONAL - Cookie expiration in days
        //   expires: 365,
        //   // OPTIONAL - Cookie secure flag
        //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //   secure: false
        // },

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: 'https://cnres.auth.eu-central-1.amazoncognito.com/login',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: 'https://cnres-fe.s3-website.eu-central-1.amazonaws.com',
          redirectSignOut: 'https://cnres-fe.s3-website.eu-central-1.amazonaws.com',
          responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      },
      API: {
        endpoints: [
          {
            name: 'user-api',
            endpoint: 'https://eij66ydkrh.execute-api.eu-central-1.amazonaws.com'
          },
          {
            name: 'user-api-rest',
            endpoint: 'https://uxkhqt800h.execute-api.eu-central-1.amazonaws.com/stage-01',
            custom_header: async () => {
              return {Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`};
            }
          }
        ]
      }
    });

  }

  isAuthenticated() {
    return this.authenticated;
  }

  refreshAuthState() {
    Auth.currentUserPoolUser().then(() => this.authenticated = true, () => this.authenticated = false);
  }

}
