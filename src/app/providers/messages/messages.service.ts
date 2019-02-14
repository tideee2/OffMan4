import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {StorageService} from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(public alertSrv: AlertController, public storageSrv: StorageService) {

    }

    async confirmAlert(title: string, messageText: string, func: any, data: any) {
        const alert = await this.alertSrv.create({
            header: title,
            message: messageText,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        throw 10;
                    }
                },
                {
                    text: 'Submit',
                    handler: func(data)
                }
            ]
        });

       await alert.present();

    }
}
