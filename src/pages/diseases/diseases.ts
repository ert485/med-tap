import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html'
})
export class DiseasesPage {
  public checkedDiseases=[];
  public diseases=['AIDS','Anthrax','Arthritis','Arthritis It\'s Your Health','Asthma','Bovine Spongiform Encephalopathy ("Mad Cow Disease")','Cancer','Cardiovascular Disease','Celiac Disease','C. difficile (Clostridium difficile)','Chlamydia','Chronic Diseases','Chronic Obstructive Pulmonary Disease (COPD)','Clostridium difficile (C. difficile)','Creutzfeldt-Jakob Disease (human form of "Mad Cow Disease")','Dengue Fever','Diabetes','E. coli (Escherichia coli) infection','Flesh-Eating (Necrotizing Fasciitis) Disease','Food Allergies and Intolerances','Food-Related Illnesses','Genital Herpes','Gonorrhoea','Heart Disease','Hepatitis','Human Papillomavirus (HPV)','Infant Botulism','Infectious Diseases','Influenza (Flu)','Lupus','Lyme Disease','Lymphogranuloma venereum (LGV)','Mad Cow Disease (BSE)','Malaria','Measles','Meningococcal Disease','Mental Health','Necrotizing Fasciitis/Mytositis ("Flesh-eating Disease")','Obesity','Osteoarthritis','Osteoporosis','Rabies','Reye\'s Syndrome','Sexually Transmitted Infections','Stroke','Sudden Infant Death Syndrome (SIDS)','Syphilis','Tuberculosis (TB)','West Nile Virus','Yellow Fever'];
  readingTag:   boolean   = false;
  writingTag:   boolean   = false;
  isWriting:    boolean   = false;
  nfcMsg:      any    = '';
  subscriptions: Array<Subscription> = new Array<Subscription>();
  
  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef,private alertCtrl: AlertController) { 
    
    this.subscriptions.push(this.nfc.addNdefListener()
    .subscribe(data => {
     
        if (!this.isWriting) {
          this.isWriting = true;
          this.nfc.write([this.nfcMsg])
          .then(() => {
            this.writingTag = false;
            this.isWriting = false;
            console.log("written");
            let alert = this.alertCtrl.create({
              title: 'Diseases Saved',
              subTitle: this.checkedDiseases.length+' diseases saved to your card.',
              buttons: ['Ok']
            });
            alert.present();

          })
          .catch(err => {
            console.log('ERROR writing')
            console.log(JSON.stringify(err));
            let alert = this.alertCtrl.create({
              title: 'Error Writing',
              subTitle: err ,
              buttons: ['Ok']
            });
            alert.present();
            this.writingTag = false;
            this.isWriting = false;
          });
      }
    },
    err => {
    
    })
    );
  }
  saveToCard(){
    
    let checkedDiseasesString:any = '';//JSON.stringify(this.checkedDiseases);
    let _self = this;
    this.checkedDiseases.forEach(function(val,i){
      checkedDiseasesString += _self.diseases[i]+',';
    });
    console.log(checkedDiseasesString);
    this.writingTag = true;
    
    this.nfcMsg =this.ndef.textRecord(checkedDiseasesString, "en", null);
    console.log(this.nfcMsg);
    
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
