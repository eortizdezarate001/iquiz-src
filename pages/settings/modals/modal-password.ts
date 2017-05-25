import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Password
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      <ion-list>
        <ion-item>
          <ion-label color="dark" stacked>Old password</ion-label>
          <ion-input type="password" [(ngModel)]="oldPass"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="dark" stacked>New password</ion-label>
          <ion-input type="password" [(ngModel)]="newPass1"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="dark" stacked>Repeat your new password</ion-label>
          <ion-input color="dark" type="password" [(ngModel)]="newPass2"></ion-input>
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
export class ModalPassword {
  oldPass: string;
  newPass1: string;
  newPass2: string;

  constructor(public params: NavParams, public viewCtrl: ViewController, public storage: Storage,
              public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController){

  }

  save() {
    if(this.newPass1 === this.newPass2){
      this.storage.get('loginUsername').then((user) => {
        this.http.get('http://iquiz.x10.bz/manage-user.php?key=updatePassword&username=' + user + '&oldpassword=' + this.oldPass + '&newpassword=' + this.newPass1)
        .map(res => res.json())
        .subscribe(data => {
          if(data.message === 'success'){
            this.storage.set('loginPassword', data.pass);
            let toast = this.toastCtrl.create({
  						message: "Your password was successfully changed.",
  						duration: 3000
  					});
  					toast.present();
            this.viewCtrl.dismiss();
          } else if (data.message === 'passerror'){
            this.showError("The password you entered is incorrect.");
          }
        });
      });
    } else {
      this.showError("Passwords don't match.");
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
