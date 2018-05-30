import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { SendPage } from '../pages/send/send';
import { NetworkPage } from '../pages/network/network';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';


import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { CoordinatesProvider } from '../providers/coordinates/coordinates';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    SendPage,
    NetworkPage,
    SignupPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    SendPage,
    NetworkPage,
    SignupPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    Geolocation,
    CoordinatesProvider
  ]
})
export class AppModule {}
