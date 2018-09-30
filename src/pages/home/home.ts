import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';
import { TabsPage } from '../tabs/tabs';
import { StorageData } from '../../providers/storage-data';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public readingTag:   boolean   = true;
  public ndefMsg:      string    = '';
  public subscriptions: Array<Subscription> = new Array<Subscription>();
  public patientId = '';

  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef,private alertCtrl: AlertController, private storageData:StorageData) { 
    this.patientId = storageData.patientId;

   /* let _self = this;
    this.subscriptions.push(this.nfc.addNdefListener()
      .subscribe(data => {
        console.log(data);
        
        _self.navCtrl.setRoot(TabsPage);
         // let payload = data.tag.ndefMessage[0].payload;
          //let tagContent = this.nfc.bytesToString(payload).substring(3);
          //this.readingTag = false;
          console.log("TAG LOADED");
         // console.log(tagContent);
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error Reading',
          subTitle: err ,
          buttons: ['Ok']
        });
        alert.present();
      })
    );*/
  }

  ionViewWillLeave() {
   /* this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });*/
  }
}
