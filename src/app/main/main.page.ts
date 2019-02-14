import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {StorageService} from '../providers/storage/storage.service';
import {Storage} from '@ionic/storage';
import {Vars} from '../../config/settings';
import {MessagesService} from '../providers/messages/messages.service';
import {FilterPage} from '../filter/filter.page';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    transactions = [];
    balance = 0;
    public listOfCategories = Vars.categories;
    public listOfColors = Vars.catColors;
    public showEditButton: boolean;

    constructor(public navCtrl: NavController,
                public storageSrv: StorageService,
                public storage: Storage,
                public messageSrv: MessagesService,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController
    ) {
        // this.transactions = this.storageSrv.transaction;
        // console.log(this.storageSrv);

    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        console.log('ww');
        // @Todo remove, add service support
        this.storage.get('transactions').then(data => {
            this.transactions = data;
        });
        this.storage.get('balance').then(data => {
            this.balance = data;
        });
    }

    addTransaction() {
        this.navCtrl.navigateForward('/add-transaction');
    }

    clickDelete(index: number) {

        this.confirmAlert('Delete transaction',
            'Do you want delete this transaction?',

            {index: index}
        ).then(data => {
            console.log('delete successful');
        }).catch(err => console.log(err));

    }

    deleteTransaction(data: any) {
        const index = data.index;
        const temp = this.storageSrv.transactions;
        temp.splice(index, 1);
        this.storageSrv.transactions = temp;
        this.transactions = temp;
    }

    async confirmAlert(title: string, messageText: string, data?: any) {
        const alert = await this.alertCtrl.create({
            header: title,
            message: messageText,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Submit',
                    handler: () => {
                        const index = data.index;
                        const temp = this.storageSrv.transactions;
                        this.balance = this.balance + (this.transactions[index].type === 'decrease' ? 1 : -1) * this.transactions[index].cost;
                        this.storageSrv.balance = this.balance;
                        temp.splice(index, 1);
                        this.storageSrv.transactions = temp;
                        this.transactions = temp;

                    }
                }
            ]
        });
        await alert.present();
    }

    showButton(x: HTMLElement) {
        // @ts-ignore
        document.querySelectorAll('.transaction-container').forEach(q => {
            if (q !== x) {
                q.className = 'transaction-container';
            }
        });
        x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container';
    }

    goToSettings() {
        this.navCtrl.navigateForward('/settings');
    }

    async addFilter() {
        const filterPage = await this.modalCtrl.create({
            component: 'FilterPage',
        }).then(data => {
            console.log(1)
        }).catch(err => console.log(2));
        // this.navCtrl.navigateForward('/filter');
    }
    async presentModal() {
        const modal = await this.modalCtrl.create({
            component: FilterPage,
            componentProps: { value: 123 }
        });
        return await modal.present();
    }
}
