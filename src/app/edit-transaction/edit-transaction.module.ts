import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditTransactionPage } from './edit-transaction.page';
import {ComponentsModule} from '../components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EditTransactionPage
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
  declarations: [EditTransactionPage]
})
export class EditTransactionPageModule {}
