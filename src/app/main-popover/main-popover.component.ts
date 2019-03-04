import {Component, OnInit, Output} from '@angular/core';
import {ModalController, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FilterPage} from '../filter/filter.page';
import {StorageService} from '../providers/storage/storage.service';
import {TransactionModel} from '../models/transaction';
import {EventEmitter} from 'events';
import {cordova} from '@ionic-native/core';

@Component({
    selector: 'app-main-popover',
    templateUrl: './main-popover.component.html',
    styleUrls: ['./main-popover.component.scss']
})
export class MainPopoverComponent implements OnInit {
    // @Output() changeFilter: EventEmitter<any> = new EventEmitter();
    constructor(
        public popoverCtrl: PopoverController,
        public navCtrl: NavController,
        public router: Router,
        public modalCtrl: ModalController,
        public storageSrv: StorageService
    ) {
    }

    ngOnInit() {
    }

    // openFilter() {
    //     // this.navCtrl.navigateForward('/filter');
    //     this.router.navigateByUrl('/filter');
    //     this.close();
    // }

    openSettings() {
        // this.navCtrl.navigateForward('/filter');
        this.router.navigateByUrl('/settings');
        this.close();
    }

    openCalendar() {
        // this.navCtrl.navigateForward('/filter');
        this.router.navigateByUrl('/calendar');
        this.close();
    }

    close() {
        this.popoverCtrl.dismiss();
    }

    qq() {
        console.log('qq');
    }

    async openFilter() {
        const modal = await this.modalCtrl.create({
            component: FilterPage,
            componentProps: {value: 123}
        });
        this.close();
        await modal.present();
    }

    exit() {
        navigator['app'].exitApp();
    }
}
