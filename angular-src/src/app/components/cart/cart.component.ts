import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() folders: any[];
  @Input() total: number;

  @Output() restUnit = new EventEmitter();
  @Output() sendSale = new EventEmitter();

  constructor() {
    // this.folders = [];
  }

  ngOnInit() {
  }

  restFolder(id){
    let folder = this.folders.find(f => f.id == id);
    if(folder.qty > 0){
      folder.qty -= 1;
      folder.subtotal -= folder.unitPrice;
      
      this.restUnit.emit({
        unitPrice: folder.unitPrice
      });

      if(folder.qty == 0){
        this.folders.forEach((f, index) => {
          if(folder.id == f.id){
            this.folders.splice(index, 1);
          }
        });
      }
    }
  }

  comprar(){
    this.sendSale.emit();
  }
  
}
