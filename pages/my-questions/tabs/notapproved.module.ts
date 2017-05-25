import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotApprovedQuestions } from './notapproved';

@NgModule({
  declarations: [
    NotApprovedQuestions,
  ],
  imports: [
    IonicPageModule.forChild(NotApprovedQuestions),
  ],
  exports: [
    NotApprovedQuestions
  ]
})
export class NotApprovedQuestionsModule {}
