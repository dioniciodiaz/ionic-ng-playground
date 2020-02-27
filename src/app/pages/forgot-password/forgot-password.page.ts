import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from "@services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  constructor(
    private forgotPasswordFormBuilder: FormBuilder,
    private forgotPasswordService: AuthService,
    public toastCtrl: ToastController,
    public router: Router) { }

  ngOnInit() {

    this.forgotPasswordForm = this.forgotPasswordFormBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  recoverPassword() {
    const emailCredentials = this.forgotPasswordForm.value;
    this.forgotPasswordService.recoverPassword(emailCredentials)
      .then(() => {
        this.forgotPasswordForm.reset();
        this.showToast('Please check your email to continue the process');
        this.router.navigateByUrl('/');
      }).catch(async (err: HttpErrorResponse) => this.showToast(err.message));
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
