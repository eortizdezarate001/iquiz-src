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
          Change your avatar
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding class="avatar-model">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div tappable (click)="select(avatars[0])">
              <label>
                <input type="radio" name="avatar" value="default0" checked/>
                <img width="100" [src]="avatars[0].src"/>
              </label>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
        <ion-col>
          <div tappable (click)="select(avatars[1])">
            <label>
              <input type="radio" name="avatar" value="default1" />
              <img width="100" [src]="avatars[1].src"/>
            </label>
          </div>
        </ion-col>
        <ion-col>
          <div tappable (click)="select(avatars[2])">
            <label>
              <input type="radio" name="avatar" value="default2" />
              <img width="100" [src]="avatars[2].src"/>
            </label>
          </div>
        </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
          <button style="width: 48%" ion-button color="dark" clear (click)="dismiss()">Cancel</button>
          <button style="width: 48%" ion-button color="dark" clear (click)="save()">Save</button>
      </ion-toolbar>
    </ion-footer>
  `
})
export class ModalAvatar {

  selectedAvatar: any;

  avatars = [
    {name: "default", src: "http://iquiz.x10.bz/avatars/default.png"},
    {name: "default1", src: "http://iquiz.x10.bz/avatars/default.png"},
    {name: "default2", src: "http://iquiz.x10.bz/avatars/default.png"},
    {name: "default3", src: "http://iquiz.x10.bz/avatars/default.png"},
    {name: "default4", src: "http://iquiz.x10.bz/avatars/default.png"},
  ]

  constructor(public params: NavParams, public viewCtrl: ViewController, public storage: Storage,
              public http: Http, public toastCtrl: ToastController) {

  }

  select(av) {
    this.selectedAvatar = av;
  }

  save() {
    console.log(this.selectedAvatar);
    /* datubase update avatar
    this.http..... */
    this.storage.set('loginAvatar', this.selectedAvatar.src);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
