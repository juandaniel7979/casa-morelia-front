import { Component, Input, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Platillo } from 'src/app/platillos/models/platillo.model';
import { Orden } from '../../models/orden.v2.model';
import { StoreService } from '../../../platillos/services/store.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{


  @Output() elemento = new EventEmitter();
  total=0;
  impuestos: number=0;

  @Input() orden:Orden={
    fecha_pedido:'',
  };

  @Input() id:string = '';


  @ViewChild('sectionToPrint') myNameElem?: ElementRef;

  onPrint() {
    const printContents = this.myNameElem!.nativeElement.innerHTML;
    console.log(printContents)
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

  constructor(private storeService:StoreService){}

  ngOnInit(): void {
    this.total=this.storeService.getTotal();
  }

}
