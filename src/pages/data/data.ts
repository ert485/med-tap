import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';
import { StorageData } from '../../providers/storage-data';
import { DiseasesPage } from '../diseases/diseases';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-data',
  templateUrl: 'data.html'
})
export class DataPage {
  public readingTag:   boolean   = true;
  public ndefMsg:      string    = '';
  public patientId = '333 333 333';
  
  constructor(public navCtrl: NavController,public storageData:StorageData) { 
    this.patientId = storageData.patientId;
  }

  ionViewWillLeave() {
    
  }
}