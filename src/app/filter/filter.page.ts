import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Vars} from '../../config/settings';
import {Router} from '@angular/router';
import {StorageService} from '../providers/storage/storage.service';

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
        public storageSrv: StorageService,
        public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    cancel() {
        this.modalCtrl.dismiss();
    }

    submitFilter() {

        this.storageSrv.changeFilter$.emit('filter:change', {
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            category: this.category
        });
        this.modalCtrl.dismiss();
    }
}
