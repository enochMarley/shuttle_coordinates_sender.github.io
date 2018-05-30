import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { CoordinatesProvider } from '../../providers/coordinates/coordinates';
import { SendPage } from './../send/send';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	username: string = "";
	password: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,private alertCtrl: AlertController, private coordinatesProvider: CoordinatesProvider, private storage: Storage) {}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad LoginPage');
	}

  	loginUser() {
  		let loading = this.loadingCtrl.create({
			content: 'Logging in. Please wait...'
		});

		loading.present();

		let data = {
			username: this.username,
			password: this.password,
		}

		this.coordinatesProvider.loginUser(data).subscribe(data => {
				loading.dismiss();
				if (data.success) {
					let alert = this.alertCtrl.create({
					    title: "Login",
					    subTitle: data.message,
					    buttons: [
					    	{
					    		text: 'Ok',
					    		handler: () => {
					    			this.storage.set('logged',true);
					    			this.navCtrl.push(SendPage)
					    		}
					    	}
					    ]
					});
					alert.present();
					this.username = "";
					this.password = "";
				} else {
					let alert = this.alertCtrl.create({
					    title: "Login",
					    subTitle: data.message,
					    buttons: ['Ok']
					});
					alert.present();
				}
			})
  	}

}
