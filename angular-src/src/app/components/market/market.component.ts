import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { SaleService } from '../../services/sale.service';
import { Folder } from '../../interfaces/folder.interface';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  folders: any[];
  folder: any;
  foldersToSend: any[];
  countFolders: number;  
  total: number = 0;
  user: any;

  constructor(
    private marketService: MarketService,
    private saleService: SaleService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { 
    this.foldersToSend = [];
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
    });
  }

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders(){
    this.marketService.getFolders().subscribe(data => {
      this.folders = data.folders;
      this.countFolders = this.folders.length;
    });
  }

  handleRestUnit(data){
    this.total -= data.unitPrice;
  }

  handleSendFolder(data){    
    this.folder = this.findFolderById(data.id);    

    var folder = this.foldersToSend.find(f => f.id == data.id);

    if(folder){
      folder.qty += 1;
      folder.subtotal = folder.qty * folder.unitPrice;
    } else {
      folder = {
        id: this.folder._id,
        description: this.folder.description,
        unitPrice: this.folder.unitPrice,
        pages: this.folder.pages,
        qty: 1,
        subtotal: this.folder.unitPrice
      }

      this.foldersToSend.push(folder);
    }

    this.total += folder.unitPrice;
  }

  handleSale(){
    if(this.foldersToSend.length <= 0 || this.foldersToSend == null){
      this.flashMessage.show('No hay carpetas seleccionadas.', {
          cssClass: 'alert-danger',
          timeout: 5000
        });

        return false;
    }

    let items = [];        

    this.foldersToSend.forEach((folder) => {
      items.push({
        description: folder.description,
        qty: folder.qty,
        unitPrice: folder.unitPrice,
        subTotal: folder.subtotal
      });
    });

    const sale = {
      client: this.user.name,
      items : items,
      total: this.total,
      userTransaction: this.user.username
    };

    this.saleService.addSale(sale).subscribe(data => {
      if(data.success){
        this.flashMessage.show('El pedido se hizo con exito', {
          cssClass: 'alert-success',
          timeout: 3000
        });

        this.foldersToSend = [];
        this.total = 0;
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });    
  }

  findFolderById(id): any{
    return this.folders.find(folder => folder._id == id);
  }
}
