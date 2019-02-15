import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import { MainPopoverComponent } from './main-popover/main-popover.component';
import {NgCalendarModule} from 'ionic2-calendar';

@NgModule({
    declarations: [
        AppComponent,
        MainPopoverComponent,

    ],
    entryComponents: [
        MainPopoverComponent
    ],
    imports: [
        // NgCalendarModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
