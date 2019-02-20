import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vars} from '../../config/settings';
import {NavController} from '@ionic/angular';
import {ErrorsService} from '../providers/errors/errors.service';
import {StorageService} from '../providers/storage/storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-edit-transaction',
    templateUrl: './edit-transaction.page.html',
    styleUrls: ['./edit-transaction.page.scss'],
})
export class EditTransactionPage implements OnInit {

    public transactionForm: FormGroup;
    public validation_messages;
    public transaction;
    listOfCategories = Vars.categories;
    listOfIncrease = Vars.incoming;
    transactionTypeDefaultValue = 'decrease';
    categoryDefaultValue = 'others';
    tempTransaction: any;
    oldTransaction: any;

    constructor(public navCtrl: NavController,
                public errorSrv: ErrorsService,
                public storageSrv: StorageService,
                public formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute
    ) {
        this.transactionForm = this.formBuilder.group({
            type: ['', Validators.required],
            cost: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^(\\d*\\.)?\\d+$')
            ])],
            category: ['', Validators.required],
            description: ['',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.minLength(5)
                ])],
            date: ['', Validators.required]
        });

        this.validation_messages = {
            'cost': {
                required: 'Enter cost of purchase',
                pattern: 'Cost must consist only of numbers'
            },
            'description': {
                required: 'Description is required',
                minlength: 'Description must be at least 5 characters long',
                maxlength: 'Description cannot be more than 20 characters long'
            },
        };
        this.tempTransaction = this.storageSrv.transactions[this.route.snapshot.paramMap.get('index')];
        this.storageSrv.balance += (this.tempTransaction.type === 'decrease' ? 1 : -1) * this.tempTransaction.cost;

        // @todo remove ts-ignore

        // // @ts-ignore
        // this.transactionForm.controls.type.value = this.tempTransaction.type;
        // // @ts-ignore
        // this.transactionForm.controls.category.value = this.tempTransaction.category;
        // // @ts-ignore
        // this.transactionForm.controls.cost.value = this.tempTransaction.cost;
        // // @ts-ignore
        // this.transactionForm.controls.description.value = this.tempTransaction.description;
        // // @ts-ignore
        // this.transactionForm.controls.date.value = this.tempTransaction.date;

        // @ts-ignore
        this.transactionForm.controls.date.value = new Date(this.tempTransaction.date);
        console.log(this.transactionForm.controls);
    }

    ngOnInit() {
        console.log('Edit transaction');
    }

    get cost() {
        return this.transactionForm.get('cost');
    }

    get type() {
        return this.transactionForm.get('type');
    }

    set type(val) {
        this.transactionForm.value.type = val;
    }

    get description() {
        return this.transactionForm.get('description');
    }

    set cost(val) {
        this.transactionForm.value.cost = val;
    }

    set description(val) {
        this.transactionForm.value.description = val;
    }

    get category() {
        return this.transactionForm.get('category');
    }

    set category(val) {
        this.transactionForm.value.category = val;
    }

    get date() {
        return this.transactionForm.get('date');
    }

    set date(val) {
        this.transactionForm.value.date = val;
    }

    cancel(): void {
        this.navCtrl.navigateBack('/main').catch(err => console.log(err));
    }

    submitPurchase(): void {
        const oldTransactions = this.storageSrv.transactions;

        oldTransactions[this.route.snapshot.paramMap.get('index')] = this.transactionForm.value;
        this.storageSrv.balance += (this.type.value === 'decrease' ? -1 : 1) * this.cost.value;
        this.storageSrv.transactions = oldTransactions;
        if (!this.storageSrv.transactions[this.route.snapshot.paramMap.get('index')].category) {
            this.storageSrv.transactions[this.route.snapshot.paramMap.get('index')].category = 'increase';
        }
        this.navCtrl.navigateBack('/main').catch(err => console.log(err));

    }
}
