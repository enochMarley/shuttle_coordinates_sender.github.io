import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

    busName = '';
    adminPass = "Hello world";
    userPassword = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController) {}
 
    ionViewDidLoad() {
        this.storage.get('busName').then(data => {
            this.busName = data;
        })
    }


    updateBusName() {
        this.showPrompt();
    }

    showPrompt() {
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

    confirmAdmin(userPassword) {
        console.log(this.adminPass,userPassword)
        if (this.adminPass == userPassword) { 
            this.storage.set('busName', this.busName);
            let alert = this.alertCtrl.create({
                title: 'Authentication',
                subTitle: 'Settings Updated Successfully',
                buttons: ['OK']
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: 'Authentication',
                subTitle: 'Wrong Admin Password!',
                buttons: ['Dismiss']
            });
            alert.present();
        }
    }
}
