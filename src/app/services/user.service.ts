import { Injectable } from '@angular/core';
import Parse from 'parse';
import { User } from "@models/user";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): Promise<any> {
    return Parse.User.currentAsync();
  }
  getUserArticles(): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = Parse.User.current();
      const Article = Parse.Object.extend("Todo");
      // Find all posts by the current user
      const query = new Parse.Query(Article);
      query.equalTo("user", user);
      query.find().then((userArticles) => {
        resolve(userArticles);
      }).catch((err) => reject(err));
    });

  }
  createArticle(content: string) {
    return new Promise((resolve, reject) => {
      const user = Parse.User.current();
      const Article = Parse.Object.extend("Todo");
      let newArticle = new Article();
      newArticle.set("content", content);
      newArticle.set("user", user);
      newArticle.save().then((article) => resolve(article))
        .catch((err) => reject(err));
    });
  }

  updateUser(userData: User, oldPassword: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await Parse.User.logIn(userData.username, oldPassword).then((user) => {
        Object.keys(userData).forEach((key) => user.set(key, userData[key]));
        user.save()
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));

    });
  };

}
