import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class FolderService {

  headerContent: any;
  apiUrl: string = 'http://localhost:8080/folders';  // /testPhoto

  constructor(
    private http: Http
  ) { 

    this.headerContent = {
      contentType: 'Content-Type',
      appJson: 'application/json',
      authorization: 'Authorization'
    };
  }

  addFolder(folder){
    let headers = new Headers();
    headers.append(this.headerContent.contentType, this.headerContent.appJson);

    return this.http.post(this.apiUrl, folder, {headers: headers})
      .map(res => res.json());
  }

}
