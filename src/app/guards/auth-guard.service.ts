import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "@services/user.service";
@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(public userService: UserService, public router: Router) { }
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getUser().then((res) => {
        if (res) {
          this.router.navigate(['home']);
          resolve(false);
        }
        resolve(true);
      })
        .catch(() => {
          resolve(true);
        });
    });
  }
}
