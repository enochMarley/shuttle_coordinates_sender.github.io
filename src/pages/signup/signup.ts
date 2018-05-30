import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { CoordinatesProvider } from '../../providers/coordinates/coordinates';
import { LoginPage } from './../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	username: string = "";
	password: string = "";
	confirmPassword: string = "";
	authCode: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private alertCtrl: AlertController,private toastCtrl: ToastController, private coordinatesProvider: CoordinatesProvider) {}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad SignupPage');
	}


	signupUser() {
		if (this.username.length < 5) { 
			this.showToast("Username must be at least 5 characters long");
		} else if (this.password !== this.confirmPassword) {
			this.showToast("The passwords you provided do not match");
		} else if (this.password.length < 8) {
			this.showToast("The passwords must be at least 8 characters long");
		} else {
			let loading = this.loadingCtrl.create({
			    content: 'Sign up. Please wait...'
			});

			loading.present();

			let data = {
				username: this.username,
				password: this.password,
				authCode : this.authCode
			}

			this.coordinatesProvider.signupUser(data).subscribe(data => {
				loading.dismiss();
				if (data.success) {
					let alert = this.alertCtrl.create({
					    title: "Signup",
					    subTitle: data.message,
					    buttons: [
					    	{
					    		text: 'Ok',
					    		handler: () => {
					    			this.navCtrl.push(LoginPage)
					    		}
					    	}
					    ]
					});
					alert.present();
					this.username = "";
					this.password = "";
					this.confirmPassword = "";
					this.authCode = "";
				} else {
					let alert = this.alertCtrl.create({
					    title: "Signup",
					    subTitle: data.message,
					    buttons: ['Ok']
					});
					alert.present();
				}
			})
		}
	}

	showToast(message) {
		let toast = this.toastCtrl.create({
		    message: message,
		    duration: 3000,
		    position: 'top'
		});

		toast.present();
	}
}
