import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menu: MenuController) {

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
  }


}
