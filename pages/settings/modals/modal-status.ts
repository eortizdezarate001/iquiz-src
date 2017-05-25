import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Status
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      <ion-list>
        <ion-item>
          <ion-input [(ngModel)]="status"></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
          <button style="width: 48%" ion-button color="dark" clear (click)="dismiss()">Cancel</button>
          <button style="width: 48%" ion-button color="dark" clear (click)="save()">Save</button>
      </ion-toolbar>
    </ion-footer>
  `
})
export class ModalStatus {
  status: string;

  constructor(public params: NavParams, public viewCtrl: ViewController, public storage: Storage,
              public http: Http, public toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
    this.status = this.params.get('status');
  }

  save() {
    this.storage.get('loginUsername').then((user) => {
      this.http.get('http://iquiz.x10.bz/manage-user.php?key=updateStatus&username=' + user + '&status=' + this.status)
      .map(res => res.json())
      .subscribe(data => {
        if(data.message === 'success'){
          this.storage.set('loginStatus', this.status);
          let toast = this.toastCtrl.create({
						message: "Your status was successfully changed.",
						duration: 3000
					});
					toast.present();
          this.viewCtrl.dismiss();
        }
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
