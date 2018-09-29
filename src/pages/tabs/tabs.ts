import { Component } from '@angular/core';

import { AlergiesPage } from '../alergies/alergies';
import { DiseasesPage } from '../diseases/diseases';
import { HomePage } from '../home/home';
import { DataPage } from '../data/data';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DataPage;
  tab3Root = AlergiesPage;
  tab4Root = DiseasesPage;

  constructor() {

  }
}
