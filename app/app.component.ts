import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { FriendsPage } from '../pages/friends/friends';
import { RankingPage } from '../pages/ranking/ranking';
import { AddQuestionPage } from '../pages/add-question/add-question';
import { Settings } from '../pages/settings/settings';
import { MyQuestions } from '../pages/my-questions/my-questions';
import { ApproveQuestion } from '../pages/approve-question/approve-question';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages: Array<{title: string, component: any, admin: boolean}>;

  username: string;
  avatar: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public event: Events) {

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

    this.setPages();

    this.event.subscribe('updateMenu', () => this.update());

  }

  setPages(){
      this.pages = [
        { title: 'Home', component: HomePage, admin : false },
        { title: 'Friends', component: FriendsPage, admin: false },
        { title: 'Ranking', component: RankingPage, admin: false },
        { title: 'Add question', component: AddQuestionPage, admin: false },
        { title: 'My questions', component: MyQuestions, admin: false },
        { title: 'Approve questions', component: ApproveQuestion, admin: true },
        { title: 'Settings', component: Settings, admin: false }
      ];
  }

  update(){
    this.storage.get('loginUsername').then((usern) => this.username = usern);
    this.storage.get('loginAvatar').then((avi) => this.avatar = avi);
    this.setPages();
  }

  openPage(page) {
    if(page.title === "Home")
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
    this.storage.set('quiz', null);
    this.nav.setRoot(Login);
  }

}
