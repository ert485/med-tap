import { Component, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { Events, Nav, Platform ,ToastController ,Tabs} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DiseasesPage } from '../pages/diseases/diseases';
import { StorageData } from '../providers/storage-data';

import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  public readingTag:   boolean   = true;
  public ndefMsg:      string    = '';
  public is_doctor:    boolean   = false;
  public subscriptions: Array<Subscription> = new Array<Subscription>();
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nfc: NFC, private ndef: Ndef,private alertCtrl: AlertController,private storageData:StorageData,private changeDetectorRef: ChangeDetectorRef) { 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.startListener();
    });
    this.is_doctor = true;//storageData.isDoctor;
  }
  openForm(){
    this.nav.setRoot(DiseasesPage);
  }
  openData(){
    this.nav.setRoot(TabsPage,{tabIndex:0});
  }
  startListener(){
    let _self = this;
      this.subscriptions.push(this.nfc.addTagDiscoveredListener()
      .subscribe(dt => {
        if(_self.storageData.recordMessage!=''){
          console.log('Saving data')
          console.log(_self.storageData.recordMessage);
          _self.nfc.write([_self.storageData.recordMessage])
            .then(() => {
              console.log("written");
              let alert = this.alertCtrl.create({
                title: 'Saved',
                subTitle:'Patient data saved to the card',
                buttons: ['Ok']
              });
              alert.present();
              _self.storageData.recordMessage='';
            })
            .catch(err => {
              console.log('Error saving')
              console.log(err)
              let alert = this.alertCtrl.create({
                title: 'Error saving',
                subTitle:'Error saving the data',
                buttons: ['Ok']
              });
              alert.present();  
              _self.storageData.recordMessage='';
            });
            _self.storageData.recordMessage='';
        }else{
          //this.readingTag = false;
          console.log("TAG LOADED");
          console.log(dt);
          if(typeof dt.tag.ndefMessage != 'undefined'){
            let payload = dt.tag.ndefMessage[0].payload;
            let tagContent = this.nfc.bytesToString(payload).substring(3);
            console.log(payload);
          }
          _self.storageData.patientId='333 777 999';
          this.changeDetectorRef.detectChanges();
          if(_self.storageData.alreadyReaded){
            _self.storageData.isDoctor = true;
            _self.nav.setRoot(TabsPage,{tabIndex:2});
          }else{
            _self.nav.setRoot(TabsPage,{tabIndex:1});
          }
          _self.storageData.alreadyReaded=true;
          
          /* let views = _self.nav.getViews();
          if(views.length>0){
            let lastView = views[views.length-1];
            console.log(lastView);
            console.log(views);
            if(lastView.name!='TabsPage'){
              _self.nav.setRoot(TabsPage,{tabIndex:1});
            }else{
              _self.storageData.isDoctor = true;
              _self.nav.setRoot(TabsPage,{tabIndex:2});
            }   
          }else{
            _self.nav.setRoot(TabsPage,{tabIndex:1});
          }*/
          
          setTimeout(function(){
            _self.changeDetectorRef.detectChanges();
            setTimeout(function(){
          //    _self.startListener();
            },100);
          },100);
        }
       

  /*
        if(
          dt.tag.id[0]==81 &&
          dt.tag.id[1]==3 &&
          dt.tag.id[2]==-76 &&
          dt.tag.id[3]==-119
        ){

          _self.nav.setRoot(TabsPage,{tabIndex:1});
        }
        if(
          dt.tag.id[0]==81 &&
          dt.tag.id[1]==3 &&
          dt.tag.id[2]==-76 &&
          dt.tag.id[3]==-119
        ){
          _self.nav.setRoot(TabsPage,{tabIndex:1});
        }
        */
        
        
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
    );
  }
}
