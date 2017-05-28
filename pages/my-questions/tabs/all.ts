import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-all-my-questions',
  template: `
    <ion-header>
      <ion-navbar hideBackButton>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>All my questions</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
    <ion-list>
      <div *ngFor="let category of questions">
        <ion-item-divider sticky *ngIf="category.data.length !== 0">{{category.name}}</ion-item-divider>
          <ion-card  *ngFor="let q of category.data">
            <ion-card-content>
              <h2>{{q.question}}</h2>
              <ion-list inset no-lines>
                <ion-item>
                  <ion-icon name="checkmark" color="secondary" item-left></ion-icon>
                  {{q.correct}}
                </ion-item>
                <ion-item>
                  <ion-icon name="close" color="danger" item-left></ion-icon>
                  {{q.incorrect1}}
                </ion-item>
                <ion-item>
                  <ion-icon name="close" color="danger" item-left></ion-icon>
                  {{q.incorrect2}}
                </ion-item>
                <ion-item>
                  <ion-icon name="close" color="danger" item-left></ion-icon>
                  {{q.incorrect3}}
                </ion-item>
              </ion-list>
            </ion-card-content>
            <ion-grid>
              <ion-row center>
                <ion-col>
                </ion-col>
                <ion-col>
                  <button ion-button clear color="danger" (click)="delete(q)">
                    <ion-icon name="trash"></ion-icon>
                    &nbsp; Delete
                  </button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card>
        </div>
      </ion-list>
    </ion-content>
  `
})
export class AllMyQuestions {

  questions = [
    {name: "Entertainment", data: []},
    {name: "Geography", data: []},
    {name: "History", data: []},
    {name: "Art", data: []},
    {name: "Sports", data: []},
    {name: "Science", data: []}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public toastCtrl  : ToastController) {
  }

  ionViewWillEnter(){
    this.getQuestions();
  }

  ionViewWillLeave() {
    this.getQuestions();
  }

  getQuestions() {
    this.storage.get('loginUsername').then((user) => {
      this.http.get('http://iquiz.x10.bz/get-question.php?key=myQuestions-all&username=' + user)
      .map(res => res.json())
      .subscribe(data => {
        if(data.length !== 0){

          for(let ques of this.questions){
            ques.data = [];
          }

          for(let q of data){
            let question = {
              question: q.question,
              correct: q.correctAnswer,
              incorrect1: q.incorrectOne,
              incorrect2: q.incorrectTwo,
              incorrect3: q.incorrectThree,
              category: q.category,
              id: q.id
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
          }
        }
      });
    });
  }

  delete(question){
    this.http.get("http://iquiz.x10.bz/manage-question.php?key=delete&id=" + question.id)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
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
