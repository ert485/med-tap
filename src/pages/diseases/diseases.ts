import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html'
})
export class DiseasesPage {
  public checkedDiseases=[];
  public diseases=['AIDS','Anthrax','Arthritis','Arthritis It\'s Your Health','Asthma','Bovine Spongiform Encephalopathy ("Mad Cow Disease")','Cancer','Cardiovascular Disease','Celiac Disease','C. difficile (Clostridium difficile)','Chlamydia','Chronic Diseases','Chronic Obstructive Pulmonary Disease (COPD)','Clostridium difficile (C. difficile)','Creutzfeldt-Jakob Disease (human form of "Mad Cow Disease")','Dengue Fever','Diabetes','E. coli (Escherichia coli) infection','Flesh-Eating (Necrotizing Fasciitis) Disease','Food Allergies and Intolerances','Food-Related Illnesses','Genital Herpes','Gonorrhoea','Heart Disease','Hepatitis','Human Papillomavirus (HPV)','Infant Botulism','Infectious Diseases','Influenza (Flu)','Lupus','Lyme Disease','Lymphogranuloma venereum (LGV)','Mad Cow Disease (BSE)','Malaria','Measles','Meningococcal Disease','Mental Health','Necrotizing Fasciitis/Mytositis ("Flesh-eating Disease")','Obesity','Osteoarthritis','Osteoporosis','Rabies','Reye\'s Syndrome','Sexually Transmitted Infections','Stroke','Sudden Infant Death Syndrome (SIDS)','Syphilis','Tuberculosis (TB)','West Nile Virus','Yellow Fever'];
  
  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef) { 
    
  }
  saveToCard(){
    console.log('saving data on NFC card')
    console.log(this.checkedDiseases)
    this.nfc.write(this.checkedDiseases).then(function(data){
      console.log('Data saved to NFC');
      console.log(data);
    });
  }

}
