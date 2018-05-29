import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { NetworkPage } from './../network/network';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network, private platform: Platform, private geolocation: Geolocation, private alertCtrl: AlertController,  private http: Http, private storage: Storage, private coordinatesProvider: CoordinatesProvider) {
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
				this.showAlert('Location', 'Could Not Get Your Location');
			});


			let watch = this.geolocation.watchPosition();
			watch.subscribe((resp) => {
				this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;
				this.sendCoordinates();
			}, error => {
				this.showAlert('Location', 'Could Not Update Your Location');
			});
	    })

	    
	}

	showAlert(title, message) {
	    let alert = this.alertCtrl.create({
	      title: title,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    alert.present();
	}


	sendCoordinates() {
		if (!this.latitude &&  !this.longitude) { 
			this.showAlert('Location', 'Could Not Update Your Location');
		} else {
			this.storage.get('busName').then(data => {
				this.busName = data;
			});

			let fullUrl = this.url + `insertCoordinates?busName=${this.busName}&lon=${this.longitude}&lat=${this.latitude}`;
			//let fullUrl = `http://localhost:4000/` + `insertCoordinates?busName=${this.busName}&lon=${this.longitude}&lat=${this.latitude}`;

			setInterval(() => {
				this.coordinatesProvider.sendCoordinates(fullUrl).subscribe(res => {
					console.log(res)
				})
			}, 10000);
		}
	}
}
