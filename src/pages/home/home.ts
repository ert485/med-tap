import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public patientData:any = {name:'Erik',birthdate:'10/09/1992',alergies:'Penicillin'};
  constructor(public navCtrl: NavController,private nfc: NFC, private ndef: Ndef) {
      this.nfc.addNdefListener(() => {
        console.log('successfully attached ndef listener');
      }, (err) => {
        console.log('error attaching ndef listener', err);
      }).subscribe((event) => {
        console.log('received ndef message. the tag contains: ', event.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
      
        let message = this.ndef.textRecord('Hello world');
        this.nfc.share([message]).then(this.onSuccess).catch(this.onError);
      });
  }
  onSuccess(data){
    console.log(data);
  }
  onError(data){
    console.log(data);
  }
  
}
