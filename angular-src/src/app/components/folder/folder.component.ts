import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  description: string;
  unitPrice: number;
  pages: number;
  user: any;

  public uploader:FileUploader;

  constructor(
    private folderService: FolderService,
    private http: Http,
    private authService: AuthService
  ) { 
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
    });

    this.uploader = new FileUploader({url:'http://localhost:8080/folders/uploadPhoto'});
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {      
      let responseObject = JSON.parse(response);

      if(responseObject.success){
        this.addFolder(responseObject.data)
      } else {
        console.log('error al subir la foto');
      }
    };
  }

  ngOnInit() {
  }

  fileUpload(item: FileItem){
    item.withCredentials = false;
    item.upload();
  }

  onCreateFolderSubmit(){
    this.fileUpload(this.uploader.queue[0]);
  }
  
  addFolder(fileName: string){
    let folder = {
      description: this.description,
      unitPrice: this.unitPrice,
      pages: this.pages,
      filePath: fileName,
      userCreated: this.user.username
    }

    this.folderService.addFolder(folder).subscribe(data => {
      if(data.success){
        console.log(data);
        this.uploader.clearQueue();
      } else {
        console.log(data);
      }
    })
  }

}
