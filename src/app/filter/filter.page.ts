import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Vars} from '../../config/settings';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  listOfCategories = Vars.categories;
  dateFrom: any;
  dateTo: any;
  category: any;
  constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    console.log(this.category);
    console.log(this.dateFrom);
    console.log(this.dateTo);
    this.modalCtrl.dismiss();
  }
}
