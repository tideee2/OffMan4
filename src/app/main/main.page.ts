import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {StorageService} from '../providers/storage/storage.service';
import {Storage} from '@ionic/storage';
import {Vars} from '../../config/settings';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    transactions = [];
    public listOfCategories = Vars.categories;
    public listOfColors = Vars.catColors;

    constructor(public navCtrl: NavController,
                public storageSrv: StorageService,
                public storage: Storage,
    ) {
        // this.transactions = this.storageSrv.transaction;
        // console.log(this.storageSrv);

        // @Todo remove, add service support

    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        console.log('ww');
        this.storage.get('transactions').then(data => {
            this.transactions = data;
        });
    }

    addTransaction() {
        this.navCtrl.navigateForward('/add-transaction');
    }
}
