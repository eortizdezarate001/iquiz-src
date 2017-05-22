import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'modal-status.html'
})
export class ModalStatus {
  status: string;

  constructor(public params: NavParams, public viewCtrl: ViewController, public storage: Storage, public http: Http, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.status = this.params.get('status');
  }

  save() {
    this.storage.get('loginUsername').then((user) => {
      this.http.get('http://iquiz.x10.bz/manage-user.php?key=updateStatus&username=' + user + '&status=' + this.status)
      .map(res => res.json())
      .subscribe(data => {
        if(data.message === 'success'){
          let toast = this.toastCtrl.create({
						message: "Your status was successfully changed.",
						duration: 3000
					});
					toast.present();
          this.viewCtrl.dismiss(this.status);
        }
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
