import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import sha1 from 'sha1';

import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loading: Loading;
  loginData = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController, 
              public http: Http, public storage: Storage, public menu: MenuController) {  

  }

  ionViewDidLoad() {
    this.storage.set('loginUsername', '');
    this.storage.set('loginPoints', '');
    this.storage.set('auth', false);
    this.menu.swipeEnable(false,'menu');
  }

  public signUp() {
    this.navCtrl.push(SignUpPage);
  }

  public login() {
    this.showLoading();
    this.http.get('http://iquiz.x10.bz/get-user.php?key=username&user=' + this.loginData.username)
    .map(res => res.json())
    .subscribe(data => {
      if(data.length == 0){
        this.showError("Incorrect username or password.")
      } else{
        if( sha1(this.loginData.password) == data[0].password ){
          this.storage.set('loginUsername', data[0].username);
          this.storage.set('loginPoints', data[0].points);
          this.storage.set('auth', true);
          this.navCtrl.setRoot(HomePage);
        } else this.showError("Incorrect username or password.");
      }
    }, error => this.showError('Unknown error.') );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
