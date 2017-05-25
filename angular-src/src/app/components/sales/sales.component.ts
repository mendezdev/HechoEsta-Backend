import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  sales: any[];
  countSales: number;

  constructor(
    private saleService: SaleService,
    private router: Router
  ) { 
    this.saleService.getSales().subscribe(data => {
      if(data.success){
        this.sales = data.sales;
        this.countSales = data.sales.length;
      } else {
        console.log("ERROR:", data);
      }
    });
  }

  ngOnInit() {
    
  }

  onVerClick(id){
    this.router.navigate(['/sale/' + id]);
  }

}
