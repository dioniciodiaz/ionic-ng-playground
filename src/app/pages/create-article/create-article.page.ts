import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from "@services/user.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.page.html',
  styleUrls: ['./create-article.page.scss'],
})
export class CreateArticlePage implements OnInit {
  articleForm: FormGroup;

  constructor(
    private createArticleFormBuilder: FormBuilder,
    private userService: UserService,
    public toastCtrl: ToastController,
    public router: Router) { }

  ngOnInit() {

    this.articleForm = this.createArticleFormBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  get content() {
    return this.articleForm.get('content');
  }

  createArticle() {
    const { content } = this.articleForm.value;
    this.userService.createArticle(content)
      .then(() => {
        this.showToast(`Article added Successfully`);
        this.articleForm.reset()
        this.router.navigateByUrl('/home/article-list') //navigateByUrl('/home');
      }).catch(async (err: HttpErrorResponse) => this.showToast(err.message));
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000
    });
    toast.present();
  }
}