import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ModalAvatar } from './modal-avatar/modal-avatar';
import { ModalStatus } from './modal-status/modal-status';
import { ModalPassword } from './modal-password/modal-password';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  settings = [
    {name: "Avatar", icon: "image", id: 'a'},
    {name: "Status", icon: "text", id: 's'},
    {name: "Password", icon: "lock", id: 'p'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  open(id){
    switch(id){
      case 'a':
        let modalA = this.modalCtrl.create(ModalAvatar);
        modalA.present();
        break;
      case 's':
        let modalS = this.modalCtrl.create(ModalStatus);
        modalS.present();
        break;
      case 'p':
        let modalP = this.modalCtrl.create(ModalPassword);
        modalP.present();
        break;
    }
  }

}
