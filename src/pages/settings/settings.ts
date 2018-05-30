import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController , LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CoordinatesProvider } from '../../providers/coordinates/coordinates';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

    busName:string = '';
    busNamesList : string[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private coordinatesProvider: CoordinatesProvider) {}
 
    ionViewDidLoad() {
        this.storage.get('busName').then(data => {
            this.busName = data;
        });

        this.busNamesList = ['A','B','C','D'];
    }


    updateBusName() {
        this.showPrompt();
    }

    showPrompt() {
        let busInBusList = this.checkItemInArray(this.busNamesList,this.busName);
        if(!busInBusList) {
            this.showToast("Wrong bus name. Please enter a valid bus name.")
        } else {

            let prompt = this.alertCtrl.create({
                title: 'Authentication',
                message: "Enter Admin Password To Continue",
                inputs: [
                  {
                    name: 'password',
                    placeholder: 'Admin Password'
                  },
                ],
                buttons: [
                  {
                    text: 'Cancel',
                    handler: data => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Save',
                    handler: data => {
                        this.confirmAdmin(data.password);
                    }
                  }
                ]
            });
            prompt.present();
        }
    }

    confirmAdmin(userPassword) {
        

        if (userPassword == "") { 
            this.showToast("Please enter admin authentication code")
        } else {
            let loading = this.loadingCtrl.create({
                content: 'Authenticating.Please wait...'
            });

            loading.present();
            let data = {
                authCode: userPassword
            }
            this.coordinatesProvider.authAdmin(data).subscribe(data => {
                loading.dismiss();

                if (data.success) { 
                    this.storage.set('busName', this.busName);
                    let alert = this.alertCtrl.create({
                        title: 'Authentication',
                        subTitle: data.message,
                        buttons: ['OK']
                    });
                    alert.present();
                } else {
                    let alert = this.alertCtrl.create({
                        title: 'Authentication',
                        subTitle: data.message,
                        buttons: ['Dismiss']
                    });
                    alert.present();
                }
            })
        }
    }

    checkItemInArray(arr:string[], item:string) {
        for (var i in arr) {

            if (arr[i] == item) {
               return true;
            }
        }

        return false;
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
