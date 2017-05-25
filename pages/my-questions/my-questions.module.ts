import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyQuestions } from './my-questions';

@NgModule({
  declarations: [
    MyQuestions,
  ],
  imports: [
    IonicPageModule.forChild(MyQuestions),
  ],
  exports: [
    MyQuestions
  ]
})
export class MyQuestionsModule {}
