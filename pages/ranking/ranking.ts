import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Login } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  ranking: Array <{username: string, points: number, status: string, isSelf: boolean, isFriend: boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public toastCtrl  : ToastController) {
  }

  ionViewDidLoad() {
    this.storage.get('auth').then((auth) => {
			if(auth === false)
				this.navCtrl.setRoot(Login);
		});
		console.log('ionViewDidLoad RankingPage');
		this.fillList();
  }

  fillList(){
		this.ranking = [];
			this.http.get('http://iquiz.x10.bz/get-user.php?key=ranking')
			.map(res => res.json())
			.subscribe(data => {
				if(data.length == 0){
					console.log('There aren\'t any users in the database.');
				} else{
					for (let u of data){
						let user = {username: u.username, points: u.points, status: u.status, isSelf: false, isFriend: false};

            this.storage.get('loginUsername').then((usuario) => {

              if(usuario === u.username)
                user.isSelf = true;

              this.http.get('http://iquiz.x10.bz/get-user.php?key=friend&user=' + usuario)
              .map(res => res.json())
        			.subscribe(friends => {
                if(friends.length != 0){
                  for (let f of friends){
                    if(f.username === u.username)
                      user.isFriend = true;
                  }
                }
              });
            });

						this.ranking.push(user);
					}
				}
			}, error => this.showError('Unknown error.') );
	}

	/*deleteFriend(friend){
		this.storage.get('loginUsername').then((usuario) => {
			this.http.get('http://iquiz.x10.bz/manage-user.php?key=deleteFriend&user=' + usuario + '&friend=' + friend.username)
			.map(res => res.json())
			.subscribe(data => {
				if(data.message == 'success'){
					let toast = this.toastCtrl.create({
						message: "Your friend was successfully deleted.",
						duration: 3000
					});
					toast.present();
				} else{
					let toast = this.toastCtrl.create({
						message: "Your friend could not be deleted.",
						duration: 3000
					});
					toast.present();
				}
			}, error => this.showError('Unknown error.') );
		});
  }*/



  showError(text) {
		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}

}
