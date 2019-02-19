import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Vars} from '../../config/settings';
import {Router} from '@angular/router';

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
        public router: Router,
        public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    cancel() {
        this.modalCtrl.dismiss();
    }

    submitFilter() {
        console.log(this.dateFrom);
        console.log(this.dateTo);
        console.log(this.category);
    }
}
