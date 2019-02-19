import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule, NavParams} from '@ionic/angular';

import {MainPage} from './main.page';
import {FilterPage} from '../filter/filter.page';
import {FilterPageModule} from '../filter/filter.module';

const routes: Routes = [
    {
        path: '',
        component: MainPage
    }
];

@NgModule({
    entryComponents: [
        // FilterPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        // FilterPageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MainPage]
})
export class MainPageModule {
}
