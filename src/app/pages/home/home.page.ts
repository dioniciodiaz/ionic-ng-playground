import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  activeTab = 'article-list';

  private articleListIcons = {
    active: './../../../assets/icon/article-list-active-icon.png',
    inactive: './../../../assets/icon/article-list-inactive-icon.svg'
  }
  private createarticleIcons = {
    active: './../../../assets/icon/add-article-active-icon.png',
    inactive: './../../../assets/icon/add-article-inactive-icon.png'
  }
  private userProfileIcons = {
    active: './../../../assets/icon/user-profile-active-icon.png',
    inactive: './../../../assets/icon/user-profile-inactive-icon.png'
  }
  constructor() {
  }

  ngOnInit() {
  }
  // this is for the images but I dont know how to place them inside de nav yet.
  getSelectedTab($event) {
    this.activeTab = $event.tab;
  }

  get acticleListIcon(): string {
    return this.activeTab === "article-list" ? this.articleListIcons.active : this.articleListIcons.inactive;
  }
  get createArticleIcon(): string {
    return this.activeTab === "add-circle-outline" ? this.createarticleIcons.active : this.createarticleIcons.inactive;
  }
  get userProfileIcon(): string {
    return this.activeTab === "user-profile" ? this.userProfileIcons.active : this.userProfileIcons.inactive;
  }
}
