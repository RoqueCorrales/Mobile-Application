import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.storage.get('token').then((val) => {
          if(val !== null){
            this.router.navigate(['home']);
          }else{
            this.router.navigateByUrl('/');
          }
        });
      }else{
        if(localStorage.getItem('token') !== null){
          this.router.navigateByUrl('/home');
        }else{
          this.router.navigateByUrl('/');
        }
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
