import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Platillo } from '../../models/platillo.model';
import { Plato } from 'src/app/ordenes/models/orden.v2.model';

@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
})
export class PlatilloComponent {

  // @Input() platillo!: Platillo;
  // @Input() platillo: Plato={
  //   _id:'',
  //   plato: {
  //     _id:'',
  //     nombre:'',
  //     imagen:'',
  //     descripcion:'',
  //     precio:0
  //   },
  //   cantidad:0,
  //   adiciones:[]
  // }
  @Input() platillo: Platillo={
    _id:'',
    nombre:'',
      imagen:'',
      descripcion:'',
      precio:0
  }
  @Output() addedPlatillo = new EventEmitter<Platillo>();
  @Output() showPlatillo = new EventEmitter<string>();


  constructor() { }

  // ngOnInit(): void {
  // }

  onAddtoCart(){
    console.log(this.platillo)
  this.addedPlatillo.emit(this.platillo);
  }

  onShowDetail(){
    console.log(this.platillo._id)
    this.showPlatillo.emit(this.platillo._id);
  }


}
