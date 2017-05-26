import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Login } from '../login/login';


@IonicPage()
@Component({
	selector: 'page-friends',
	templateUrl: 'friends.html',
})
export class FriendsPage {

	friends: Array <{username: string, points: number, status: string, avatar: string}> = [];
	allFriends: Array <{username: string, points: number, status: string, avatar: string}> = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public toastCtrl  : ToastController) {
	}

	ionViewDidLoad() {
		this.storage.get('auth').then((auth) => {
			if(auth === false)
				this.navCtrl.setRoot(Login);
		});
		//console.log('ionViewDidLoad FriendsPage');
		this.getAllFriends();
	}

	ionViewDidEnter() {
		this.fillList();
	}

	fillList(){
		this.storage.get('loginUsername').then((usuario) => {
			this.http.get('http://iquiz.x10.bz/get-user.php?key=friend&user=' + usuario)
			.map(res => res.json())
			.subscribe(data => {
				if(data.length == 0){
					console.log('You have no friends.');
				} else{
					this.friends = [];
					for (let f of data){
						let friend = {username: f.username, points: f.points, status: f.status, avatar: f.avatar};
						this.friends.push(friend);
					}
				}
			}, error => this.showError('Unknown error.') );
		});

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
					this.removeFriend(friend);
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

	showError(text) {
		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}

	removeFriend(friend){
		let index = this.friends.indexOf(friend);
		if(index > -1){
			this.friends.splice(index, 1);
		}
	}

	//SEARCH

	getItems(ev){

		var val = ev.target.value;

		if(val == '')
			this.fillList();

		if(val && val.trim() != ''){
			this.friends = this.allFriends.filter((item) => {
				return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
		}
	}

	getAllFriends(){
		this.storage.get('loginUsername').then((usuario) => {
			this.http.get('http://iquiz.x10.bz/get-user.php?key=friend&user=' + usuario)
			.map(res => res.json())
			.subscribe(data => {
				if(data.length == 0){
					console.log('You have no friends.');
				} else{
					for (let f of data){
						let friend = {username: f.username, points: f.points, status: f.status, avatar: f.avatar};
						this.allFriends.push(friend);
					}
				}
			}, error => this.showError('Unknown error.') );
		});
	}
}
