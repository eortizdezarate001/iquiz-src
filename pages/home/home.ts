import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';
import { SelectCategoryPage } from '../select-category/select-category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menu: MenuController, public event: Events) {

  }

  ionViewDidLoad() {
    this.menu.swipeEnable(true,'menu');
    if(this.navParams.get('through')){
      this.navCtrl.push(this.navParams.get('component'));
    }
    this.storage.get('auth').then((auth) => {
      if(auth === false)
        this.navCtrl.setRoot(Login);
    });
    this.event.publish('updateMenu');
  }

  ionViewWillEnter() {
    this.event.publish('updateMenu');
  }

  startPlaying(){
    this.navCtrl.setRoot(SelectCategoryPage);
  }

}
