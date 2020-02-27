import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, } from '@ionic/angular';


import { UserService } from "@services/user.service";
import { AuthService } from "@services/auth.service";
import { ValidatePassword } from "@validators/password.validator";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userForm: FormGroup;
  showConfirmValidation = false;
  userId = '';

  constructor(
    private userFormBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {

    const userFields = this.userFormBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });

    const passwordFields = this.userFormBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), ValidatePassword])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), ValidatePassword])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), ValidatePassword])],
    });

    this.userForm = this.userFormBuilder.group({
      passwordFields,
      userFields,
    });

    this.userForm.get('passwordFields').get('confirmPassword').valueChanges.subscribe((value) => {
      if (this.password.value === value) {
        this.showConfirmValidation = false;
      } else {
        this.showConfirmValidation = true;
      }
    });
    this.userService.getUser().then((user) => {
      const { id, name, email } = user.attributes;
      this.userId = id;
      this.userForm.get('userFields').patchValue({ name, email });
    })
  }

  get email() {
    return this.userForm.get('userFields').get('email');
  }

  get name() {
    return this.userForm.get('userFields').get('name');
  }
  get currentPassword() {
    return this.userForm.get('passwordFields').get('currentPassword');
  }
  get password() {
    return this.userForm.get('passwordFields').get('password');
  }
  get confirmPassword() {
    return this.userForm.get('passwordFields').get('confirmPassword');
  }

  get userFieldsAreInvalid() {
    return this.userForm.get('userFields').invalid
  }

  get passwordFieldsAreInvalid() {
    return this.userForm.get('passwordFields').invalid
  }

  async updateUser() {


    if (this.password.value !== this.confirmPassword.value) {
      this.showConfirmValidation = true;
      return;
    }
    const { name, email } = this.userForm.get('userFields').value;
    const userCredentials = { name, email, username: name, password: this.password.value, }

    this.userService.updateUser(userCredentials, this.currentPassword.value)
      .then(() => this.showToast("User Updated Successfully"))
      .catch(() => this.showToast("Invalid Password"));
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  logOut() {
    this.authService.logout().then(() => this.router.navigateByUrl('/'));
  }
}
