import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController, Platform, PopoverController} from '@ionic/angular';
import {StorageService} from '../providers/storage/storage.service';
import {Storage} from '@ionic/storage';
import {Vars} from '../../config/settings';
import {MessagesService} from '../providers/messages/messages.service';
import {FilterPage} from '../filter/filter.page';
import {MainPopoverComponent} from '../main-popover/main-popover.component';
import {Router} from '@angular/router';
import {EventEmitter} from 'events';
import {TransactionModel} from '../models/transaction';
import {toArray} from 'rxjs/operators';
import {ToastShowService} from '../providers/toast-show/toast-show.service';

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
    someEvent: EventEmitter<any> = new EventEmitter();
    subscription: any;
    showFilterCancel = false;

    constructor(public navCtrl: NavController,
                private platform: Platform,
                public storageSrv: StorageService,
                public storage: Storage,
                public messageSrv: MessagesService,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public popoverCtrl: PopoverController,
                public router: Router,
                public toastSrv: ToastShowService
    ) {
        // this.transactions = this.storageSrv.transaction;
        // console.log(this.storageSrv);
        this.storageSrv.changeFilter$.addListener('filter:change', data => {
            console.log(data);

            this.showFilterCancel = true;
            this.transactions = this.storageSrv.transactions.filter((transaction: TransactionModel) => {
                const categoryQuery = (data.category) ? !!~data.category.indexOf(transaction.category) : true;
                const dateFromQuery = (data.dateFrom) ? (new Date(transaction.date)) >= (new Date(data.dateFrom)) : true;
                const dateToQuery = (data.dateTo) ? (new Date(transaction.date)) <= (new Date(data.dateTo)) : true;
                console.log(categoryQuery + ':' + dateFromQuery + ':' + dateToQuery);
                return categoryQuery && dateFromQuery && dateToQuery;
            });
        });
    }

    ngOnInit() {
        console.log(navigator['app']);
    }

    ionViewDidEnter() {console.log(navigator['app']);
        this.subscription = this.platform.backButton.subscribe(() => {
            // alert(this.storageSrv.isFilterOpen);
            if (!this.storageSrv.isFilterOpen) {
                navigator['app'].exitApp();
            }
        });
    }

    ionViewWillLeave() {
        this.subscription.unsubscribe();
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

    addTransactionClick() {
        this.navCtrl.navigateForward('/add-transaction');
    }

    editTransactionClick(index: number) {
        this.navCtrl.navigateForward('/edit-transaction/' + index);
    }

    deleteTransactionClick(index: number) {

        this.confirmAlert('Delete transaction',
            'Do you want delete this transaction?',
            {index: index}
        ).then(data => {
            console.log('delete successful');
        }).catch(err => console.log(err));

    }

    delT(data: any) {
        const index = data.index;
        const temp = this.storageSrv.transactions;
        console.log(this.balance);
        console.log((this.transactions[index].type === 'decrease' ? 1 : -1) * this.transactions[index].cost);
        this.balance = this.storageSrv.balance +  (this.transactions[index].type === 'decrease' ? 1 : -1) * this.transactions[index].cost;
        this.storageSrv.balance = this.balance;
        temp.splice(index, 1);
        this.storageSrv.transactions = temp;
        this.transactions = temp;
        console.log(this.balance);
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
                    handler: this.delT.bind(this, data)
                }
            ]
        });
        await alert.present();
    }

    showButton(x: HTMLElement) {

        document.querySelectorAll('.transaction-container').forEach(q => {
            if (q !== x) {
                q.className = 'transaction-container';
            }
        });
        // @ts-ignore
        x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container';
    }

    goToSettings() {
        this.navCtrl.navigateForward('/settings');
    }

    async addFilter() {
        const filterPage = await this.modalCtrl.create({
            component: FilterPage,
        }).then(data => {
            console.log(1);
        }).catch(err => console.log(2));
        // this.navCtrl.navigateForward('/filter');
    }

    async presentModal() {
        const modal = await this.modalCtrl.create({
            component: FilterPage,
            componentProps: {value: 123}
        });
        return await modal.present();
    }

    async openPopover(event) {
        const popover = await this.popoverCtrl.create({
            component: MainPopoverComponent,
            event: event
        });
        await popover.present();
    }

    async addMoney() {
        const alert = await this.alertCtrl.create({
            header: 'Incoming',
            inputs: [
                {
                    name: 'balance',
                    type: 'number',
                    id: 'balance',
                    placeholder: 'balance',
                },
                {
                    name: 'description',
                    type: 'text',
                    id: 'description',
                    placeholder: 'description',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        if (!data.balance) {
                            this.toastSrv.showToast('balance is empty');
                            return;
                        }
                        // if (data.description.length < 5) {
                        //     this.toastSrv.showToast('description is too short');
                        //     return;
                        // }
                        this.storageSrv.balance += 1 * data.balance;
                        const temp = this.storageSrv.transactions || [];
                        temp.push({
                            type: 'increase',
                            category: 'increase',
                            cost: data.balance,
                            description: data.description,
                            date: (new Date()).toISOString().split('T')[0],
                        });
                        temp.sort((a, b) => a - b);
                        // @todo remove transaction duplicate
                        this.storageSrv.transactions = temp;
                        this.transactions = temp;
                        // this.balance += 1 * data.balance;
                    }
                }
            ]
        });
        await alert.present();
    }

    cancelFilter() {
        this.showFilterCancel = false;
        this.transactions = this.storageSrv.transactions;
    }
}
