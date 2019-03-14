import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GooglePlus} from '@ionic-native/google-plus/ngx';

@Injectable({
    providedIn: 'root'
})
export class GoogleApiServiceService {

    accessToken = '';
    loader = false;
    isGoogleError = false;

    constructor(private http: HttpClient, private googlePlus: GooglePlus) {
    }

    syncGoogle() {
        this.loader = true;
        this.isGoogleError = false;
        this.googlePlus.login({
            'scopes': 'https://www.googleapis.com/auth/drive',
            // 'webClientId': '311564314948-5e6ce904f7kcdoj0rc2afv08fbet8qt9.apps.googleusercontent.com',
            'webClientId': '161256311171-r63qaa7j0atdbs1ghj59o2ap2nrbp852.apps.googleusercontent.com',
            // 'offline': true
        }).then(responseAuth => {
            alert('ok');
            let q = '';
            for (const x in responseAuth) {
              if (responseAuth.hasOwnProperty(x)) {
                q += x + ' : ' + responseAuth[x] + '\n';
              }
            }
            alert(q);
            this.loader = false;
            this.accessToken = responseAuth.accessToken;
            // alert(this.accessToken);
            const httpOptions = {
                headers: new HttpHeaders({
                    // 'Content-Type':  'application/json',
                    // 'Authorization': `Bearer ${this.accessToken}`
                    'Authorization': `Bearer ${this.accessToken}`
                })
            };
            this.http.get(`https://www.googleapis.com/drive/v3/files`, httpOptions).toPromise().then(responseFilesList => {
                alert('ok2');
                // @ts-ignore
                alert(Object.keys(responseFilesList));
                // @ts-ignore
                alert(responseFilesList.files.length);
                // @ts-ignore
                alert('id1- ' + responseFilesList.files[0].id);
                // @ts-ignore
                // alert('id2- ' + responseFilesList.files[1].id);
            }).catch(err => alert('error'));
            // alert(this.accessToken);
        })
            .catch(err => {
                alert('error connection');
                alert(err);
                // alert(err);
                // alert(err.message);
                // let q = '';
                // for (const x in err) {
                //   if (err.hasOwnProperty(x)) {
                //     q += x + ' : ' + err[x] + '\n';
                //   }
                // }
                // alert(q);
                this.loader = false;
                this.isGoogleError = true;
            });
    }
}
