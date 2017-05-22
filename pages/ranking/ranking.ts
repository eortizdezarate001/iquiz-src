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

	ranking: Array <{index: number, username: string, points: number, status: string, isSelf: boolean, isFriend: boolean}> = [];
	allRanking: Array <{index: number, username: string, points: number, status: string, isSelf: boolean, isFriend: boolean}> = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public toastCtrl  : ToastController) {
	}

	ionViewDidLoad() {
		this.storage.get('auth').then((auth) => {
			if(auth === false)
				this.navCtrl.setRoot(Login);
		});
		console.log('ionViewDidLoad RankingPage');
		this.fillList();
		this.getAllRanking();
	}

	fillList(){
		
		this.http.get('http://iquiz.x10.bz/get-user.php?key=ranking')
		.map(res => res.json())
		.subscribe(data => {
			if(data.length == 0){
				console.log('There aren\'t any users in the database.');
			} else{
				this.ranking = [];
				let i : number = 1;
				for (let u of data){
					let user = {index: i, username: u.username, points: u.points, status: u.status, isSelf: false, isFriend: false};
					i++;

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

	deleteFriend(friend){
		this.storage.get('loginUsername').then((usuario) => {
			this.http.get('http://iquiz.x10.bz/manage-user.php?key=deleteFriend&user=' + usuario + '&friend=' + friend.username)
			.map(res => res.json())
			.subscribe(data => {
				if(data.message == 'success'){
					let toast = this.toastCtrl.create({
						message: friend.username + " and you are no longer friends.",
						duration: 3000
					});
					toast.present();
					friend.isFriend = false;
				} else{
					let toast = this.toastCtrl.create({
						message: "Your friend could not be deleted.",
						duration: 3000
					});
					toast.present();
				}
			}, error => this.showError('Unknown error.') );
		});
	}

	addFriend(friend){
		this.storage.get('loginUsername').then((usuario) => {
			this.http.get('http://iquiz.x10.bz/manage-user.php?key=addFriend&user=' + usuario + '&friend=' + friend.username)
			.map(res => res.json())
			.subscribe(data => {
				if(data.message == 'success'){
					let toast = this.toastCtrl.create({
						message: friend.username + " and you are now friends.",
						duration: 3000
					});
					toast.present();
					friend.isFriend = true;
				} else{
					let toast = this.toastCtrl.create({
						message: "This user could not be added as a friend.",
						duration: 3000
					});
					toast.present();
				}
			}, error => this.showError('Unknown error.') );
		});
	}

	settings() {

	}

	showError(text) {
		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}


	//SEARCH

	getItems(ev){

		var val = ev.target.value;

		if(val == '')
			this.fillList();

		if(val && val.trim() != ''){
			this.ranking = this.allRanking.filter((item) => {
				return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
		}
	}

	getAllRanking(){
		this.http.get('http://iquiz.x10.bz/get-user.php?key=ranking')
		.map(res => res.json())
		.subscribe(data => {
			if(data.length == 0){
				console.log('There aren\'t any users in the database.');
			} else{
				let i : number = 1;
				for (let u of data){
					let user = {index: i, username: u.username, points: u.points, status: u.status, isSelf: false, isFriend: false};
					i++;

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

					this.allRanking.push(user);
				}
			}
		}, error => this.showError('Unknown error.') );
	}

}
