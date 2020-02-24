import { Injectable } from '@angular/core';
import Parse from 'parse';

import {
  UserLoginCredentials,
  UserSignUpCredentials,
  UserForgotPasswordCredentials
} from "@models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signIn({ username, password }: UserLoginCredentials): Promise<any> {
    return Parse.User.logIn(username, password);
  }

  signUp({ username, password, secondaryFields }: UserSignUpCredentials): Promise<any> {
    return Parse.User.signUp(username, password, secondaryFields);
  }
  recoverPassword({ email }: UserForgotPasswordCredentials): Promise<any> {
    return Parse.User.requestPasswordReset(email);
  }
}
