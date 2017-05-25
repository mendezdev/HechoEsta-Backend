import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Sale } from '../../interfaces/sale.interface';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  id: string;
  client: string;
  date: Date;  
  items: Array<any>
  total: number;
  status: boolean;
  userTransaction: string;
  updateDate: Date;

  constructor(
    private saleService: SaleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.saleService.getSaleById(this.id).subscribe(data => {
      if(data.success){
        this.client = data.data.client;
        this.date = data.data.date;
        this.items = data.data.items;
        this.total = data.data.total;
        this.status = data.data.status;
        this.userTransaction = data.data.userTransaction;
        this.updateDate = data.data.updateDate;
      } else {
        console.log("ERROR: ", data);
      }      
    });
  }

}
