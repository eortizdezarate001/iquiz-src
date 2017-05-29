import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { SelectCategoryPage } from '../select-category/select-category';
import { FinishPage } from '../finish/finish';

@IonicPage()
@Component({
	selector: 'page-question',
	templateUrl: 'question.html',
})
export class QuestionPage {

	question: string = '';
	galZenb: number = 0;
	answers = ['','','',''];
	unekoGal: any;
	myColor = ['dark','dark','dark','dark'];
	isDisabled: boolean = true;
	btnDisabled: any = false;


	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http, public toastCtrl : ToastController) {
	}

	ionViewDidEnter() {

			this.storage.get('questionIndex').then((indize) => {
				if(indize > 10){
	        this.navCtrl.setRoot(FinishPage);
				} else {
					this.galZenb = indize;
				}
			});
			this.storage.get('quiz').then((test) => {
				let uneko: number = this.galZenb -1;
				this.unekoGal = test[uneko];
				//console.log(this.unekoGal);
				this.question = test[uneko].question;
				let list: any[] = [test[uneko].correctAnswer,test[uneko].incorrectOne, test[uneko].incorrectTwo, test[uneko].incorrectThree];
				this.shuffle(list);
				for(var _i = 0; _i<4; _i++){
					this.answers[_i] = list[_i];
				}
			});
	}

	check(i){
		if(this.answers[i] == this.unekoGal.correctAnswer){
			this.myColor[i] = 'secondary';
			//console.log('CORRECT');
			this.storage.get('currentPoints').then((puntu) => {
				this.storage.set('currentPoints', puntu +10);
			});
		} else {
			this.myColor[i] = 'danger';
			for(var _i = 0; _i<4; _i++){
				if(this.answers[_i] == this.unekoGal.correctAnswer){
					this.myColor[_i] = 'secondary';
				}
			}
			this.storage.get('currentPoints').then((puntu) => {
				if(puntu > 0){
					this.storage.set('currentPoints', puntu -5);
				}
			});

			//console.log('WRONG');
		}
		this.isDisabled = false;
		this.btnDisabled ='no-click';
	}

	nextQuestion(){
		this.navCtrl.setRoot(SelectCategoryPage);
	}

	shuffle(array) {
		let currentIndex: number = array.length;
		let temporaryValue: number = 0;
		let randomIndex: number = 0;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

}
