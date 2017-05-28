import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Login } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-approve-question',
  templateUrl: 'approve-question.html',
})
export class ApproveQuestion {

  questions = [
    {name: "Entertainment", data: []},
    {name: "Geography", data: []},
    {name: "History", data: []},
    {name: "Art", data: []},
    {name: "Sports", data: []},
    {name: "Science", data: []}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.storage.get('auth').then((auth) => {
			if(auth === false)
				this.navCtrl.setRoot(Login);
		});
    this.storage.get('loginUsername').then((user) => {
      if(user !== 'admin'){
        this.navCtrl.setRoot(HomePage);
      }
    });

    this.getQuestions();
  }

  ionViewWillLeave() {
    this.getQuestions();
  }

  getQuestions() {
    this.http.get('http://iquiz.x10.bz/get-question.php?key=newQuestions')
    .map(res => res.json())
    .subscribe(data => {
      if(data.length !== 0){

        for(let ques of this.questions){
          ques.data = [];
        }

        for(let q of data){

          this.http.get('http://iquiz.x10.bz/get-user.php?key=username&user=' + q.author)
          .map(res => res.json())
          .subscribe(user => {
            let question = {
              question: q.question,
              correct: q.correctAnswer,
              incorrect1: q.incorrectOne,
              incorrect2: q.incorrectTwo,
              incorrect3: q.incorrectThree,
              category: q.category,
              id: q.id,
              author: q.author,
              avatar: user[0].avatar
            };
            switch (q.category){
              case 'Entertainment':
                this.questions[0].data.push(question);
                break;
              case 'Geography':
                this.questions[1].data.push(question);
                break;
              case 'History':
                this.questions[2].data.push(question);
                break;
              case 'Art':
                this.questions[3].data.push(question);
                break;
              case 'Sports':
                this.questions[4].data.push(question);
                break;
              case 'Science':
                this.questions[5].data.push(question);
                break;
            }
          });
        }
      }
    });
  }

  approve(question){
    this.http.get("http://iquiz.x10.bz/manage-question.php?key=approve&id=" + question.id)
    .map(res => res.json())
    .subscribe(data => {
      if(data.message === "success"){
				let toast = this.toastCtrl.create({
					message: "The question was approved successfully.",
					duration: 3000
				});
				toast.present();
				this.removeQuestion(question);
			} else{
				let toast = this.toastCtrl.create({
					message: "The question could not be approved.",
					duration: 3000
				});
				toast.present();
			}
    });
  }

  delete(question){
    this.http.get("http://iquiz.x10.bz/manage-question.php?key=delete&id=" + question.id)
    .map(res => res.json())
    .subscribe(data => {
      if(data.message === "success"){
				let toast = this.toastCtrl.create({
					message: "Your question was deleted successfully.",
					duration: 3000
				});
				toast.present();
				this.removeQuestion(question);
			} else{
				let toast = this.toastCtrl.create({
					message: "Your question could not be deleted.",
					duration: 3000
				});
				toast.present();
			}
    });
  }

  removeQuestion(question){
    switch (question.category){
      case 'Entertainment':
        let index0 = this.questions[0].data.indexOf(question);
    		if(index0 > -1){
    			this.questions[0].data.splice(index0, 1);
    		}
        break;
      case 'Geography':
        let index1 = this.questions[1].data.indexOf(question);
    		if(index1 > -1){
    			this.questions[1].data.splice(index1, 1);
    		}
        break;
      case 'History':
        let index2 = this.questions[2].data.indexOf(question);
    		if(index2 > -1){
    			this.questions[2].data.splice(index2, 1);
    		}
        break;
      case 'Art':
        let index3 = this.questions[3].data.indexOf(question);
    		if(index3 > -1){
    			this.questions[3].data.splice(index3, 1);
    		}
        break;
      case 'Sports':
        let index4 = this.questions[4].data.indexOf(question);
    		if(index4 > -1){
    			this.questions[4].data.splice(index4, 1);
    		}
        break;
      case 'Science':
        let index5 = this.questions[5].data.indexOf(question);
    		if(index5 > -1){
    			this.questions[5].data.splice(index5, 1);
    		}
        break;
    }
  }

}
