import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { QuestionPage } from '../question/question';
import { FinishPage } from '../finish/finish';

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {

  category: string ='';
  index: number = 0;
  unekoPuntuak: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http, public toastCtrl : ToastController, public menu: MenuController) {
  }

  ionViewWillEnter() {
    //console.log('ionViewDidLoad SelectCategoryPage');
    this.menu.swipeEnable(false,'menu');
    //Guardar 10 preguntas
    this.storage.get('quiz').then((test) => {
      if(!test){
        this.http.get('http://iquiz.x10.bz/get-question.php?key=random')
        .map(res => res.json())
        .subscribe(data => {
          if(data.length == 0){
            this.showError("There are no questions.");
          } else{
            this.storage.set('quiz', data);
            this.category = data[0].category;
            this.storage.set('questionIndex', 1);
            this.index = 1;
            this.storage.set('currentPoints', 0);
            this.unekoPuntuak = 0;
          }
        }, error => this.showError('Unknown error.'));

      } else {
        this.storage.get('questionIndex').then((indize) => {
          if(indize < 10){
            this.storage.set('questionIndex', indize +1);
            this.index = indize +1;

            this.storage.get('quiz').then((gal) => {
              this.category = gal[this.index -1].category;
            });
            this.storage.get('currentPoints').then((puntu) => {
              this.unekoPuntuak = puntu;
            });

          } else {
            this.navCtrl.setRoot(FinishPage);
          }
        });
      }
    });
}


ansQuest(){
  this.navCtrl.setRoot(QuestionPage);
}

doConfirm() {
  let confirm = this.alertCtrl.create({
    title: 'Exit',
    message: 'Do you really want to exit?',
    buttons: [
    {
      text: 'No',
      handler: () => {
        console.log('No clicked');
      }
    },
    {
      text: 'Yes',
      handler: () => {
        this.navCtrl.setRoot(FinishPage);
        this.storage.set('currentPoints', 0);
        console.log('Yes clicked');
      }
    }
    ]
  });
  confirm.present()
}

showError(text) {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: text,
    buttons: ['OK']
  });
  alert.present(prompt);
}

}
