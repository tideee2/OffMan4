import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vars} from '../../config/settings';
import {NavController} from '@ionic/angular';
import {ErrorsService} from '../providers/errors/errors.service';
import {StorageService} from '../providers/storage/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TagsComponent} from '../components/tags/tags.component';

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
    oldBalance: any;
    public tags = '';
    public tagsArray = [];
    public chosenTags = [];
    @ViewChild(TagsComponent) tagsReference;

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
        // this.tempTransaction.tags =  this.removeSpaces(this.tempTransaction.tags);
        this.tagsArray = this.tempTransaction.tags;
        this.oldBalance = (this.tempTransaction.type === 'decrease' ? 1 : -1) * this.tempTransaction.cost;
        console.log(this.tagsArray);
        // @todo remove ts-ignore

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
        console.log(this.tagsReference);
        const oldTransactions = this.storageSrv.transactions;
        oldTransactions[this.route.snapshot.paramMap.get('index')] = {...this.transactionForm.value,
            tags: (this.type.value === 'decrease') ? this.tagsReference.purchaseTags : ''};
        this.storageSrv.balance += this.oldBalance + (this.type.value === 'decrease' ? -1 : 1) * this.cost.value;
        this.storageSrv.transactions = oldTransactions;
        if (!this.storageSrv.transactions[this.route.snapshot.paramMap.get('index')].category) {
            this.storageSrv.transactions[this.route.snapshot.paramMap.get('index')].category = 'increase';
        }
        this.navCtrl.navigateBack('/main').catch(err => console.log(err));
    }

    test() {
        this.displayChips();
    }

    displayChips() {
        let localTags = this.tags.replace(/([^A-Za-zА-Яа-я]+)/g, '$1§sep§').split('§sep§');
        localTags = localTags.filter(tag => tag !== '');
        localTags = localTags.map(tag => {
            return tag.replace(/\s/g, '');
        });
        console.log(localTags);
        console.log(this.storageSrv.tags);
        const temp = this.storageSrv.tags;

        localTags.forEach(tag => {
            if (temp.hasOwnProperty(tag)) {
                temp[tag]++;
            } else {
                temp[tag] = 1;
            }
        });
        if (temp.hasOwnProperty('')) {
            delete temp[''];
        }
        for (const tag in temp) {
            if (this.tagsArray.find(element => element.name === tag)) {
                this.tagsArray.find(element => element.name === tag);
            } else {
                this.tagsArray.push({
                    name: tag,
                    value: temp[tag],
                    chosen: 0
                });
            }
        }
        this.tagsArray.sort(((a, b) => b.value - a.value));

        this.storageSrv.tags = temp;
        console.log(this.tagsArray);
    }

    choseTag(tag) {

        let tempTag = this.tagsArray.find(element => element.name === tag.name);
        tempTag.chosen = !tempTag.chosen;
        console.log(this.tagsArray.filter(element => element.name !== ''));
        this.tags = this.tagsArray.map(element => element.chosen ? element.name : '').join(' ');
        this.tags = this.tags.trim();
        this.tags = this.tags.replace(/ +(?= )/g, '');

        console.log(this.tags);
    }

    removeSpaces(arr) {
        // return arr.filter(el => el !== '');
    }
}
