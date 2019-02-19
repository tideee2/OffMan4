import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FilterPage} from '../filter/filter.page';

@Component({
    selector: 'app-main-popover',
    templateUrl: './main-popover.component.html',
    styleUrls: ['./main-popover.component.scss']
})
export class MainPopoverComponent implements OnInit {

    constructor(
        public popoverCtrl: PopoverController,
        public navCtrl: NavController,
        public router: Router,
        public modalCtrl: ModalController
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
            componentProps: { value: 123 }
        });
        this.close();
        return await modal.present();
    }
}
