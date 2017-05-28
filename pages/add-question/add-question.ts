import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
	selector: 'page-add-question',
	templateUrl: 'add-question.html',
})
export class AddQuestionPage {

	loading: Loading;
	quesData = {question: '', correctAns: '', wrong1: '', wrong2: '', wrong3: '', category:''};

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: Http, public toastCtrl : ToastController) {
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad AddQuestionPage');
	}

	addQuestion() {
		this.storage.get('loginUsername').then((usuario) => {
			this.http.get('http://iquiz.x10.bz/manage-question.php?key=insert&question=' + this.quesData.question + '&correctAnswer=' + this.quesData.correctAns + '&incorrectOne=' + this.quesData.wrong1 + '&incorrectTwo=' + this.quesData.wrong2 + '&incorrectThree=' + this.quesData.wrong3 + '&category=' + this.quesData.category + '&author=' + usuario)
			.map(res => res.json())
			.subscribe(data => {
				if(data.message === 'success'){
					let toast = this.toastCtrl.create({
						message: "The question was created.",
						duration: 3000
					});
					toast.present();
				} else{
					this.showError("The question could not be inserted.");
				}
			}, error => this.showError('Unknown error.') );
		});
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
