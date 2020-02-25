import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): Promise<any> {
    return Parse.User.currentAsync();
  }
}
