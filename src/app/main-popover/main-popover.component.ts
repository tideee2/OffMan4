import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-popover',
    templateUrl: './main-popover.component.html',
    styleUrls: ['./main-popover.component.scss']
})
export class MainPopoverComponent implements OnInit {

    constructor(
        public popoverCtrl: PopoverController,
        public navCtrl: NavController,
        public router: Router
    ) {
    }

    ngOnInit() {
    }

    openFilter() {
        // this.navCtrl.navigateForward('/filter');
        this.router.navigateByUrl('/filter');
        this.close();
    }

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
}
