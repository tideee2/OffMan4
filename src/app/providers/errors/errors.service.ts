import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {

    constructor() {
    }

    public getErrorMessage(form: any, name: any, validation_messages: any): any {
        const res = [];
        Object.keys(form.controls[name].errors).forEach((error) => {
            res.push(validation_messages[name][error]);
        });
        return res[0];
    }
}
