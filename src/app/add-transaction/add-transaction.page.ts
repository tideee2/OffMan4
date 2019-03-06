import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Vars} from '../../config/settings';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorsService} from '../providers/errors/errors.service';
import {StorageService} from '../providers/storage/storage.service';
import {TagsComponent} from '../components/tags/tags.component';
import {Content} from '@angular/compiler/src/render3/r3_ast';
// import {TagsComponent} from '../components/tags/tags.component';

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
    public allTags = [];
    public purchaseTags = [];
    @ViewChild(TagsComponent) tagsReference;

    constructor(public navCtrl: NavController,
                public errorSrv: ErrorsService,
                public storageSrv: StorageService,
                public formBuilder: FormBuilder,
                // public content: Content
    ) {
        this.transactionForm = this.formBuilder.group({
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
        this.allTags = this.storageSrv.tags;
    }

    ngOnInit() {
        console.log('qq');
    }

    // ngAfterViewInit(): void {
    //     window.addEventListener('keyboardDidShow', this.customScroll);
    // }
    //
    // private customScroll() {
    //     this.content.scrollTo(0, 100); // 100 replaced by your value
    // }

    get cost() {
        return this.transactionForm.get('cost');
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
        const temp = this.storageSrv.transactions || [];
        console.log(temp);
        temp.unshift({
            type: 'decrease',
            cost: this.cost.value,
            category: this.category.value,
            description: this.description.value,
            date: (new Date()).toISOString(),
            tags: this.tagsReference.purchaseTags
        });
        console.log(temp);
        console.log(this.purchaseTags);
        this.storageSrv.balance = this.storageSrv.balance + (-1) * this.cost.value;
        this.storageSrv.transactions = temp;
        this.navCtrl.navigateBack('/main').catch(err => console.log(err));
    }

}
