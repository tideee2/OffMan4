import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Vars} from '../../config/settings';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorsService} from '../providers/errors/errors.service';
import {StorageService} from '../providers/storage/storage.service';

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.page.html',
    styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {
    public transactionForm: FormGroup;
    public validation_messages;
    public transaction;
    listOfCategories = Vars.categories;
    listOfIncrease = Vars.incoming;
    transactionTypeDefaultValue = 'decrease';
    categoryDefaultValue = 'others';
    public tags = '';
    public tagsArray = [];
    public chosenTags = [];

    constructor(public navCtrl: NavController,
                public errorSrv: ErrorsService,
                public storageSrv: StorageService,
                public formBuilder: FormBuilder,
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
                ])]
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
    }

    async ngOnInit() {
        console.log('qq');
        setTimeout(() => {
            this.displayChips();
        }, 300);
    }

    ionViewWillEnter() {
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
            date: (new Date()).toISOString(),
            tags: this.tagsArray.map(tag => tag.chosen ? tag.name : '')
        });
        console.log(temp);
        this.storageSrv.balance = this.storageSrv.balance + ((this.transactionType.value === 'decrease') ? -1 : 1) * this.cost.value;
        this.storageSrv.transactions = temp;
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
        // if (this.chosenTags.find( element => element.name === tag.name)) {
        //     this.chosenTags.splice(this.chosenTags.indexOf(tag), 1);
        // } else {
        //     this.chosenTags.push(tag);
        // }
        let tempTag = this.tagsArray.find(element => element.name === tag.name);
        tempTag.chosen = !tempTag.chosen;
        console.log(this.tagsArray.filter(element => element.name !== ''));
        this.tags = this.tagsArray.map(element => element.chosen ? element.name : '').join(' ');
        this.tags = this.tags.trim();
        this.tags = this.tags.replace(/ +(?= )/g, '');

        console.log(this.tags);
    }
}
