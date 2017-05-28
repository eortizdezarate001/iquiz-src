import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Avatar
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding class="avatar-model">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div tappable (click)="select(avatars[0])">
              <label>
                <input type="radio" name="avatar" value="{{avatars[0].name}}" checked="{{avatars[0].checked}}"/>
                <img width="100" [src]="avatars[0].src"/>
              </label>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div tappable (click)="select(avatars[1])">
              <label>
                <input type="radio" name="avatar" value="{{avatars[1].name}}" checked="{{avatars[1].checked}}"/>
                <img width="100" [src]="avatars[1].src"/>
              </label>
            </div>
          </ion-col>
          <ion-col>
            <div tappable (click)="select(avatars[2])">
              <label>
                <input type="radio" name="avatar" value="{{avatars[2].name}}" checked="{{avatars[2].checked}}"/>
                <img width="100" [src]="avatars[2].src"/>
              </label>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div tappable (click)="select(avatars[3])">
              <label>
                <input type="radio" name="avatar" value="{{avatars[3].name}}" checked="{{avatars[3].checked}}"/>
                <img width="100" [src]="avatars[3].src"/>
              </label>
            </div>
          </ion-col>
          <ion-col>
            <div tappable (click)="select(avatars[4])">
              <label>
                <input type="radio" name="avatar" value="{{avatars[4].name}}" checked="{{avatars[4].checked}}"/>
                <img width="100" [src]="avatars[4].src"/>
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
  currentAvatar: any;
  selectedAvatar: any;

  avatars = [
    {name: "default", src: "http://iquiz.x10.bz/avatars/default.png", checked: false},
    {name: "mario", src: "http://iquiz.x10.bz/avatars/mario.png", checked: false},
    {name: "pikachu", src: "http://iquiz.x10.bz/avatars/pikachu.png", checked: false},
    {name: "link", src: "http://iquiz.x10.bz/avatars/link.jpg", checked: false},
    {name: "sonic", src: "http://iquiz.x10.bz/avatars/sonic.jpg", checked: false},
  ]

  constructor(public params: NavParams, public viewCtrl: ViewController, public storage: Storage,
              public http: Http, public toastCtrl: ToastController, public event: Events) {

  }

  ionViewWillEnter() {
    let currentAvatarURL = this.params.get('avatar');
    for(let avi of this.avatars){
      if(avi.src === currentAvatarURL){
        this.selectedAvatar = avi;
        this.currentAvatar = avi;
        avi.checked = true;
      }
    }
  }

  select(av) {
    this.selectedAvatar = av;
  }

  save() {
    if(this.selectedAvatar.name === this.currentAvatar.name){
      this.viewCtrl.dismiss();
    } else {
      this.storage.get('loginUsername').then((user) => {
        this.http.get('http://iquiz.x10.bz/manage-user.php?key=updateAvatar&username=' + user + '&avatar=' + this.selectedAvatar.src)
        .map(res => res.json())
        .subscribe(data => {
          if(data.message === 'success'){
            this.storage.set('loginAvatar', this.selectedAvatar.src);
            let toast = this.toastCtrl.create({
  						message: "Your avatar was successfully changed.",
  						duration: 3000
  					});
  					toast.present();
            this.event.publish('updateMenu');
            this.viewCtrl.dismiss();
          }
        });
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
