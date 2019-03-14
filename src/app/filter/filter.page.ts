import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Vars} from '../../config/settings';
import {Router} from '@angular/router';
import {StorageService} from '../providers/storage/storage.service';
import {ToastShowService} from '../providers/toast-show/toast-show.service';

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
        public toastSrv: ToastShowService,
        public storageSrv: StorageService,
        public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.storageSrv.isFilterOpen = true;
    }

    cancel() {
        this.storageSrv.isFilterOpen = false;
        this.modalCtrl.dismiss();
    }
    ionViewWillLeave() {
        this.storageSrv.isFilterOpen = false;
    }
    submitFilter() {

        this.storageSrv.changeFilter$.emit('filter:change', {
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            category: this.category
        });
        this.modalCtrl.dismiss();
        this.storageSrv.isFilterOpen = false;
    }

    dateCahnges(element) {
        console.log(this.dateFrom + ':' + this.dateTo);
        if (this.dateFrom > this.dateTo) {
            this.toastSrv.showToast('date To must be more than date From')
            element.value = '';
        }
    }
}
