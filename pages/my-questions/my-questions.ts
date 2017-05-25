import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AllMyQuestions } from './tabs/all';
import { ApprovedQuestions } from './tabs/approved';
import { NotApprovedQuestions } from './tabs/notapproved';


@IonicPage()
@Component({
  selector: 'page-my-questions',
  template: `
    <ion-tabs>
      <ion-tab [root]="tab1" tabTitle="All"></ion-tab>
      <ion-tab [root]="tab2" tabTitle="Approved"></ion-tab>
      <ion-tab [root]="tab3" tabTitle="Not approved"></ion-tab>
    </ion-tabs>
  `
})
export class MyQuestions {

  tab1 = AllMyQuestions;
  tab2 = ApprovedQuestions;
  tab3 = NotApprovedQuestions;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
