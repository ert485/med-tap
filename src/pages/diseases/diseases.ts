import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';
import { StorageData } from '../../providers/storage-data';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html'
})
export class DiseasesPage {
  public checkedDiseases=[];
  public diseases=['Asthma','Cancer','Diabetes','Food Allergies and Intolerances','Heart Disease','Hepatitis','Osteoporosis'];
  readingTag:   boolean   = false;
  writingTag:   boolean   = false;
  isWriting:    boolean   = false;
  bloodType: string='';
  first_name: string='';
  last_name: string='';
  email: string='';
  phone: string='';

  nfcMsg:      any    = '';
  public patientId = '333 333 333';
  subscriptions: Array<Subscription> = new Array<Subscription>();
  
  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef,private alertCtrl: AlertController,public storageData:StorageData) { 
    this.patientId = storageData.patientId;
  }
  saveToCard(){
    
    let nfcMessage:any = '';//JSON.stringify(this.checkedDiseases);
    nfcMessage +='Name:'+this.first_name+' '+this.last_name+"\n";
    nfcMessage +='Email:'+this.email+"\n";
    nfcMessage +='Phone:'+this.phone+"\n";
    nfcMessage +='Diseases:'+"\n";
    let _self = this;
    this.checkedDiseases.forEach(function(val,i){
      nfcMessage += _self.diseases[i]+',';
    });
    console.log(nfcMessage);
  
    this.storageData.recordMessage = this.ndef.textRecord(nfcMessage, "en", null);

    console.log(this.nfcMsg);
    this.checkedDiseases=[];
    
  }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  
  readTag() {
    this.readingTag = true;
  }
  
  
  


}
