import { Component } from '@angular/core';
import Parse from 'parse';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from "@env/environment";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeParseApi();
    });
  }

  initializeParseApi() {
    Parse.serverURL = environment.parseServerURL;

    Parse.initialize(
      environment.parseAplicationId,
      environment.parseJavaScriptKey
    );
  }
}
