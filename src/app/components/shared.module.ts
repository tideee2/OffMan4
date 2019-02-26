import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagsComponent} from './tags/tags.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        TagsComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        TagsComponent
    ],
})
export class ComponentsModule {}
