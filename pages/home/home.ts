import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  ionViewDidLoad() {
    this.storage.get('auth').then((auth) => {
      if(auth === false)
        this.navCtrl.setRoot(Login);
    });
  }


}
