import {Component, OnInit} from '@angular/core';
import {GoogleApiServiceService} from '../providers/googleApiService/google-api-service.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(public googleSrv: GoogleApiServiceService) {
    }

    ngOnInit() {
    }

    syncGoogle() {
        this.googleSrv.syncGoogle();
    }

}
