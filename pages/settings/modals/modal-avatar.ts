import { Component } from '@angular/core';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Change your avatar
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span ion-text color="primary" showWhen="ios">Cancel</span>
            <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>

    </ion-content>
  `
})
export class ModalAvatar {

}
