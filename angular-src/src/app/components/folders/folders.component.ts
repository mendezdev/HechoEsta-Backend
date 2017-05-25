import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  @Input()
  folders: any[];

  @Input()
  countFolders: number;

  @Output() sendFolder = new EventEmitter();

  constructor(

  ) { }

  ngOnInit() {

  }

  addToCart(idFolder){
    this.sendFolder.emit({
      id: idFolder
    });
  }
}
