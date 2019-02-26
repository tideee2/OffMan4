import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTransactionPage } from './add-transaction.page';
import {TagsComponent} from '../components/tags/tags.component';
import {ComponentsModule} from '../components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTransactionPage]
})
export class AddTransactionPageModule {}
