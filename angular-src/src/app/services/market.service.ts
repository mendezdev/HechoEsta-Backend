import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MarketService {

  folders: any[];
  headerContent: any;
  apiUrl: string = 'http://localhost:8080/folders';

  constructor(
    private http: Http
  ) { 
    this.headerContent = {
      contentType: 'Content-Type',
      appJson: 'application/json',
      authorization: 'Authorization'
    };
  }


  getFolders(){
    let headers = new Headers();

    headers.append(this.headerContent.contentType, this.headerContent.appJson);

    return this.http.get(this.apiUrl, {headers: headers})
      .map(res => res.json());
  }
  
}
