import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovedQuestions } from './approved';

@NgModule({
  declarations: [
    ApprovedQuestions,
  ],
  imports: [
    IonicPageModule.forChild(ApprovedQuestions),
  ],
  exports: [
    ApprovedQuestions
  ]
})
export class ApprovedQuestionsModule {}
