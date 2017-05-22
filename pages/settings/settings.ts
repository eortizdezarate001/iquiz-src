import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  ];

  settingsData = {avatar: '', status: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public storage: Storage, public http: Http) {
  }

  ionViewDidLoad() {
    this.storage.get('loginUsername').then((user) => {
      this.http.get('http://iquiz.x10.bz/get-user.php?key=username&user=' + user)
      .map(res => res.json())
      .subscribe(data => {
        this.settingsData.avatar = data[0].avatar;
        this.settingsData.status = data[0].status;
        this.settingsData.password = data[0].password;
      });
    });
  }

  open(id){
    switch(id){
      case 'a':
        let modalA = this.modalCtrl.create(ModalAvatar, this.settingsData.avatar);
        modalA.present();
        break;
      case 's':
        let modalS = this.modalCtrl.create(ModalStatus, {status: this.settingsData.status});
        modalS.onDidDismiss(modalStatus => this.settingsData.status = modalStatus);
        modalS.present();
        break;
      case 'p':
        let modalP = this.modalCtrl.create(ModalPassword, this.settingsData.password);
        modalP.present();
        break;
    }
  }

}
