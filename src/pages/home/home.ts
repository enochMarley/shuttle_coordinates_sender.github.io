import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SendPage } from './../send/send';
import { SettingsPage } from './../settings/settings';
import { NetworkPage } from './../network/network';
import { SignupPage } from './../signup/signup';
import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';



@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController,private storage:Storage) {

	}

	ionViewWillLeave() {
		this.storage.remove('logged');
	}

	//method to go to the coordinates sending page
	goToSendPage() {
		this.navCtrl.push(SendPage);
	}

	//method to go to the settings page
	goToSettingPage() {
		this.navCtrl.push(SettingsPage);
	}

	goToSignupPage() {
		this.navCtrl.push(SignupPage);
	}

	goToLoginPage() {
		this.navCtrl.push(LoginPage);
	}
}
