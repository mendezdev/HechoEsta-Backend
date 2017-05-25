import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SaleService {

  headerContent: any;
  apiUrl: string = 'http://localhost:8080/sales';

  constructor(
    private http: Http
  ) { 
    this.headerContent = {
      contentType: 'Content-Type',
      appJson: 'application/json',
      authorization: 'Authorization'
    };
  }

  getSales(){
    let headers = new Headers();
    headers.append(this.headerContent.contentType, this.headerContent.appJson);

    return this.http.get(this.apiUrl, {headers:headers})
      .map(res => res.json());
  }

  getSaleById(id){
    let headers = new Headers();
    headers.append(this.headerContent.contentType, this.headerContent.appJson);

    return this.http.get(this.apiUrl + '/' + id, {headers:headers}).
      map(res => res.json());
  }

  addSale(sale){
    let headers = new Headers();

    headers.append(this.headerContent.contentType, this.headerContent.appJson);

    return this.http.post(this.apiUrl, sale, {headers: headers})
      .map(res => res.json());
  }
}
