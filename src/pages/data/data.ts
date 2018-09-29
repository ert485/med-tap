import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'data.html'
})
export class DataPage {
  
  constructor(public navCtrl: NavController,private nfc: NFC, private ndef: Ndef) {
    
  }

}
