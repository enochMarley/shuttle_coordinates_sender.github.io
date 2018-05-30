import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { NetworkPage } from './../network/network';
import { HomePage } from './../home/home';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CoordinatesProvider } from '../../providers/coordinates/coordinates';



/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
	latitude: any;
	longitude: any;
	url: any = 'https://shuttle-tracker-api.herokuapp.com/';
	sendData: any;
	busName;

	constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController, private toastCtrl: ToastController,  private http: Http, private storage: Storage, private coordinatesProvider: CoordinatesProvider) {
		this.storage.get('logged').then(data => {
			if (data == null) {
				this.showToast("Please login to continue");
				this.navCtrl.push(HomePage)
			}
		})
	}

  	ionViewDidEnter() {
		this.network.onConnect().subscribe(data => {
			console.log('hello')
		}, error => {
			console.error(error)
		})

		this.network.onDisconnect().subscribe(data => {
			console.log(data)
		}, error => {
			console.error(error)
		})
	}

	ionViewDidLoad() {

	    this.platform.ready().then(() => {
	    	this.geolocation.getCurrentPosition().then((resp) => {
			 	this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;
				this.sendCoordinates();
			}).catch((error) => {
				this.showToast("Could not update your location")
			});


			let watch = this.geolocation.watchPosition();
			watch.subscribe((resp) => {
				this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;
				this.sendCoordinates();
			}, error => {
				this.showToast("Could not update your location")
			});
	    })
	}

	showToast(message) {
		let toast = this.toastCtrl.create({
		    message: message,
		    duration: 3000,
		    position: 'top'
		});

		toast.present();
	}


	sendCoordinates() {
		if (!this.latitude &&  !this.longitude) { 
			this.showToast("Could not update your location")
		} else {
			this.storage.get('busName').then(data => {
				this.busName = data;
			});

			let fullUrl = this.url + `insertCoordinates?busName=${this.busName}&lon=${this.longitude}&lat=${this.latitude}`;
			//let fullUrl = `http://localhost:4000/` + `insertCoordinates?busName=${this.busName}&lon=${this.longitude}&lat=${this.latitude}`;

			setInterval(() => {
				this.coordinatesProvider.sendCoordinates(this.busName,this.latitude, this.longitude).subscribe(res => {
					console.log(res)
				})
			}, 10000);
		}
	}
}
