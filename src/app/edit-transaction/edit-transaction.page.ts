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
    tempTransaction = {};

    constructor(public navCtrl: NavController,
                public errorSrv: ErrorsService,
                public storageSrv: StorageService,
                public formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute
    ) {
        this.transactionForm = this.formBuilder.group({
            transactionType: ['', Validators.required],
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
        console.log(this.tempTransaction);

        // @todo remove ts-ignore

        // @ts-ignore
        this.transactionForm.controls.transactionType.value = this.tempTransaction.type;
        // @ts-ignore
        this.transactionForm.controls.category.value = this.tempTransaction.category;
        // @ts-ignore
        this.transactionForm.controls.cost.value = this.tempTransaction.cost;
        // @ts-ignore
        this.transactionForm.controls.description.value = this.tempTransaction.description;
        // @ts-ignore
        this.transactionForm.controls.date.value = this.tempTransaction.date;
    }

    ngOnInit() {
        console.log('qq');
    }

    get cost() {
        return this.transactionForm.get('cost');
    }

    get transactionType() {
        return this.transactionForm.get('transactionType');
    }

    set transactionType(val) {
        this.transactionForm.value.transactionType = val;
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
        console.log(this.transactionForm);
        const temp = this.storageSrv.transactions;
        console.log(temp);
        temp.unshift({
            cost: this.cost.value,
            category: this.transactionType.value === 'decrease' ? this.category.value : 'increase',
            type: this.transactionType.value,
            description: this.description.value,
            date: new Date()
        });
        console.log(temp);
        this.storageSrv.balance = this.storageSrv.balance + ((this.transactionType.value === 'decrease') ? -1 : 1) * this.cost.value;
        this.storageSrv.transactions = temp;
        this.navCtrl.navigateBack('/main').catch(err => console.log(err));
    }
}
