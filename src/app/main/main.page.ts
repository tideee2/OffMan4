import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    transactions = [];

    constructor(public navCtrl: NavController) {

    }

    ngOnInit() {
       console.log(this.transactions);
    }

    addTransaction() {
        this.navCtrl.navigateForward('/add-transaction');
    }
}
