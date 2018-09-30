import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AlergiesPage } from '../pages/alergies/alergies';
import { DiseasesPage } from '../pages/diseases/diseases';
import { DataPage } from '../pages/data/data';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProtectedPage } from '../pages/protected/protected';
import { StorageData } from '../providers/storage-data';
import { NFC, Ndef } from '@ionic-native/nfc';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AlergiesPage,
    DiseasesPage,
    DataPage,
    HomePage,
    TabsPage,
    ProtectedPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlergiesPage,
    DiseasesPage,
    DataPage,
    HomePage,
    TabsPage,
    ProtectedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NFC, Ndef,StorageData
  ]
})
export class AppModule {}
