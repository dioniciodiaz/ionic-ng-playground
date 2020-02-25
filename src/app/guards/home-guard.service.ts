import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "@services/user.service";


@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {
  constructor(public userService: UserService, public router: Router) { }
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getUser().then((res) => {
        resolve(true);
      })
        .catch(() => {
          this.router.navigate(['']);
          resolve(false);
        });
    });
  }
}
