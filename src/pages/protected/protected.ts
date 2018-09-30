import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';
import { DiseasesPage } from '../diseases/diseases';
import { AlertController } from 'ionic-angular';
import { StorageData } from '../../providers/storage-data';

@Component({
  selector: 'page-protected',
  templateUrl: 'protected.html'
})
export class ProtectedPage {
  public is_doctor = false;
  public patientId = '333 333 333';
  constructor(public navCtrl: NavController,public storageData:StorageData) { 
    this.patientId = storageData.patientId;
    let _self = this;
    console.log('IS DOCTOR!')
    this.is_doctor = this.storageData.isDoctor;
  }

}