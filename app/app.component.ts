import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { FriendsPage } from '../pages/friends/friends';
import { RankingPage } from '../pages/ranking/ranking';
import { Settings } from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages: Array<{title: string, component: any, isHome: boolean}>;

  username: string;
  public avatar: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {

    this.storage.get('auth').then((auth) => {
      if(auth)
        this.rootPage = HomePage;
      else
        this.rootPage = Login;
    });

    this.storage.get('loginUsername').then((usern) => {
      this.username = usern;
    });

    this.storage.get('loginAvatar').then((avi) => {
      this.avatar = avi;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage, isHome : true },
      { title: 'Friends', component: FriendsPage, isHome: false },
      { title: 'Ranking', component: RankingPage, isHome: false },
      { title: 'Settings', component: Settings, isHome: false}
    ];
  }

  update(){
    this.storage.get('loginUsername').then((usern) => this.username = usern);
    this.storage.get('loginAvatar').then((avi) => this.avatar = avi);
  }

  openPage(page) {
    if(page.isHome)
      this.nav.setRoot(page.component, {through: false});
    else
      this.nav.setRoot(HomePage, {through: true, component: page.component});
  }

  logout(){
    this.storage.set('loginUsername', '');
    this.storage.set('loginPassword', '');
    this.storage.set('loginPoints', '');
    this.storage.set('loginStatus', '');
    this.storage.set('loginAvatar', '');
    this.storage.set('auth', false);
    this.nav.setRoot(Login);
  }

}
