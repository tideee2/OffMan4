import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageService} from './providers/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#000');

      this.splashScreen.hide();
      console.log(localStorage.getItem('isOpen'));
      if (!localStorage.getItem('isOpen')) {
        this.storage.transactions = <any>[];
        this.storage.tags = {tea: 1, coffee: 1, water: 1};
        this.storage.balance = 0;
        this.storage.username = 'Petya';
        localStorage.setItem('isOpen', 'true');
      }
    });
  }
}
