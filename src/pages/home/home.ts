import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SendPage } from './../send/send';
import { SettingsPage } from './../settings/settings';
import { NetworkPage } from './../network/network';



@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {

	}

	//method to go to the coordinates sending page
	goToSendPage() {
		this.navCtrl.push(SendPage);
	}

	//method to go to the settings page
	goToSettingPage() {
		this.navCtrl.push(SettingsPage);
	}
}
