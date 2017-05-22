import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, ToastController, MenuController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

	loading: Loading;
  	signData = {email: '', username: '', password:''};

	constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public http: Http, public toastCtrl  : ToastController, public menu: MenuController) {

	}

  ionViewDidLoad() {
  }

	public register(){
		this.showLoading();

    let username  = this.signData.username,
        email     = this.signData.email,
        password  = this.signData.password;

    let body    : String   = "key=insert&username="+ username + "&password=" + password + "&email=" + email,
        type    : String   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers : any      = new Headers({ 'Content-Type': type}),
        options : any      = new RequestOptions({ headers: headers }),
        url     : any      = "http://iquiz.x10.bz/manage-user.php";

    this.http.post(url, body, options)
    .map(res => res.json())
    .subscribe((data) =>{
      if(data.message === 'success'){

        let toast = this.toastCtrl.create({
          message: "The account was created.",
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();

      } else if(data.message === 'error'){
        this.showError("The account could not be created.");
      }
    }, (error) => this.showError("Something went wrong...") );

	}

	showLoading() {
  	this.loading = this.loadingCtrl.create({
  			content: 'Please wait...',
  			dismissOnPageChange: true
  	});
  	this.loading.present();
	}

	showError(text) {
  	this.loading.dismiss();
  	let alert = this.alertCtrl.create({
  	  title: 'Error',
  	  subTitle: text,
  	  buttons: ['OK']
  	});
  	alert.present(prompt);
	}

}
