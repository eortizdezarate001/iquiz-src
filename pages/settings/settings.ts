import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ModalAvatar } from './modals/modal-avatar';
import { ModalStatus } from './modals/modal-status';
import { ModalPassword } from './modals/modal-password';

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
  ];

  settingsData = {avatar: '', status: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public storage: Storage, public http: Http) {
  }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData() {
    this.storage.get('loginStatus').then((status) => this.settingsData.status = status);
    this.storage.get('loginAvatar').then((avatar) => this.settingsData.avatar = avatar);
    this.storage.get('loginPassword').then((pass) => this.settingsData.password = pass);
  }

  open(id){
    switch(id){
      case 'a':
        let modalA = this.modalCtrl.create(ModalAvatar, this.settingsData.avatar);
        modalA.present();
        break;
      case 's':
        let modalS = this.modalCtrl.create(ModalStatus, {status: this.settingsData.status});
        modalS.onDidDismiss(data => {
          this.loadData();
        });
        modalS.present();
        break;
      case 'p':
        let modalP = this.modalCtrl.create(ModalPassword, {pass: this.settingsData.password});
        modalS.onDidDismiss(data => {
          this.loadData();
        });
        modalP.present();
        break;
    }
  }

}
