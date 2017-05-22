import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'modal-status.html'
})
export class ModalStatus {
  status: string;

  constructor(public viewCtrl: ViewController, public storage: Storage, public http: Http) {

  }

  ionViewDidLoad() {
    this.storage.get('loginUsername').then((user) => {
      this.http.get('http://iquiz.x10.bz/get-user.php?key=username&user=' + user)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
      });
    });
  }

}
