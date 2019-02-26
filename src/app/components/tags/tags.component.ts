import {Component, Input, OnInit, AfterContentInit, HostListener} from '@angular/core';
import {StorageService} from '../../providers/storage/storage.service';
import {AlertController, IonicModule} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

    allTags = [];
    @Input() purchaseTags;
    @Input() all;
    @Input() mode?;
    tagsArray = [];
    tagsString = '';
    form: FormGroup;


    constructor(public storageSrv: StorageService, public fb: FormBuilder, public alertCtrl: AlertController) {
        this.getTags();
        this.form = this.fb.group({
            tags: ['', Validators.pattern('[a-zA-Z ]*')]
        });
    }

    ngOnInit() {
        console.log('tags component enter');
        console.log(this.purchaseTags);
    }

    @HostListener('keypress', ['$event']) kuku(event: any) {
        console.log(event);
        if (!new RegExp(/[a-zA-Z ]/).test(event.key)) {
            event.preventDefault();
        }
    }

    chooseTag(tag, index) {
        this.tagsArray[index].chosen = !this.tagsArray[index].chosen;
        this.purchaseTags = this.tagsArray.filter(element => element.chosen).map(element => element.name);
        if (!this.mode) {
            this.tagsString = this.purchaseTags.join(' ');
        }
    }

    getTags(): void {
        const tagsObservable = this.storageSrv.getTags();
        tagsObservable.subscribe(data => {
            for (const key in data) {
                if (key !== '') {
                    this.tagsArray.push({
                        name: key,
                        value: data[key],
                        chosen: (this.purchaseTags && key && !~this.purchaseTags.indexOf(key) ? 0 : 1)
                    });
                }
            }
            if (!this.mode) {
                this.tagsString = this.purchaseTags.join(' ');
            }
        });
    }

    addTag() {
        const temp = this.tagsString.trim().replace(/  +/g, ' ');
        console.log(temp);
        this.tagsString = temp;
        this.purchaseTags = temp.split(' ');
        console.log(this.tagsArray);
        this.tagsArray = _.unionBy(this.tagsArray, temp.split(' ').map(tag => ({name: tag, value: 1, chosen: 1})), 'name');
        console.log(this.tagsArray);
        console.log(temp.split(' ').map(tag => ({name: tag, value: 1, chosen: 1})));
        // const newTags = {};
        // this.tagsArray.forEach(tag => {
        //     newTags[tag.name] = tag.value;
        // });
        this.storageSrv.tags = this.convertTagsToStorage(this.tagsArray);
    }

    convertTagsToStorage(data) {
        const newTags = {};
        this.tagsArray.forEach(tag => {
            newTags[tag.name] = tag.value;
        });
        return newTags;
    }

    async deleteGlobalTag(tag) {

        const alert = await this.alertCtrl.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        _.remove(this.tagsArray, (element) => element.name === tag.name);
                        this.storageSrv.tags = this.convertTagsToStorage(this.tagsArray);
                    }
                }
            ]
        });
        return await alert.present();
    }
}
