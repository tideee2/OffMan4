import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import { Vars } from '../../config/settings';

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

    constructor(public navCtrl: NavController,
                public formBuilder: FormBuilder,
    ) {
        // this.transactionForm = this.formBuilder.group({
        //     transactionType: ['', Validators.required],
        //     cost: ['', Validators.compose([
        //         Validators.required,
        //         Validators.pattern('^(\\d*\\.)?\\d+$')
        //     ])],
        //     category: ['', Validators.required],
        //     description: ['',
        //         Validators.compose([
        //             Validators.required,
        //             Validators.maxLength(30),
        //             Validators.minLength(5)
        //         ])]
        // });

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

    cancel(): void {
        this.navCtrl.pop();
    }
}