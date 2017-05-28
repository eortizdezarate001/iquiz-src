import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveQuestion } from './approve-question';

@NgModule({
  declarations: [
    ApproveQuestion,
  ],
  imports: [
    IonicPageModule.forChild(ApproveQuestion),
  ],
  exports: [
    ApproveQuestion
  ]
})
export class ApproveQuestionModule {}
