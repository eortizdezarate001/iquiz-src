import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllMyQuestions } from './all';

@NgModule({
  declarations: [
    AllMyQuestions,
  ],
  imports: [
    IonicPageModule.forChild(AllMyQuestions),
  ],
  exports: [
    AllMyQuestions
  ]
})
export class AllMyQuestionsModule {}
