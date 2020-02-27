import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from "@services/auth.service";
import { UserService } from "@services/user.service";
import { ValidatePassword } from "@validators/password.validator";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})

export class SignInPage implements OnInit {

  signInForm: FormGroup;
  passwordInput: string = 'password';
  lockIcon: boolean = false;

  constructor(
    private signInFormBuilder: FormBuilder,
    private signInService: AuthService,
    private userService: UserService,
    public toastCtrl: ToastController,
    public router: Router) { }

  ngOnInit() {
    this.signInForm = this.signInFormBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), ValidatePassword])],
    });
  }


  get password() {
    return this.signInForm.get('password');
  }
  get username() {
    return this.signInForm.get('username');
  }

  togglePasswordInputTypeAndIcon() {
    const actual = this.passwordInput;
    this.passwordInput = actual === 'password' ? 'text' : 'password'
    this.lockIcon = actual === 'password';
  }

  async signIn() {
    const userCredentials = this.signInForm.value;
    this.signInService.signIn(userCredentials)
      .then(() => this.confirmAuth())
      .catch(async (err: HttpErrorResponse) => {
        this.showToast(err.message);
        this.signInService.logout();
      });
  }

  confirmAuth() {
    this.userService.getUser().then((res) => {
      if (res) {
        this.router.navigateByUrl('/home/article-list')
      } else {
        this.confirmAuth();
      }
    })
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
