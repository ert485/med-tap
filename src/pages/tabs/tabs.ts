import { Component } from '@angular/core';
import {  NavParams,NavController,Tab,App } from 'ionic-angular';
import { AlergiesPage } from '../alergies/alergies';
import { DiseasesPage } from '../diseases/diseases';
import { HomePage } from '../home/home';
import { DataPage } from '../data/data';
import { ProtectedPage } from '../protected/protected';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabIndex = 1;
  public doctor = false;
  tab1Root = HomePage;
  tab2Root = DataPage;
  tab3Root = ProtectedPage;

  constructor( public navParams: NavParams,public navCtrl: NavController,public app:App) {
    this.tabIndex = navParams.data.tabIndex || 0;
    this.doctor = navParams.data.doctor || false;
    
  }
  tabChange(tab: Tab){
    //this.tabIndex = tab.index;
    console.log('TAB CHANGED');
    console.log(this.tabIndex);
    console.log(tab.index);
   
  }
}
