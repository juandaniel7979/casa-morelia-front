import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Platillo } from '../../models/platillo.model';

@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
})
export class PlatilloComponent {

  // @Input() platillo!: Platillo;
  @Input() platillo: Platillo={
    id:'',
    precio:0,
    imagen:"",
    nombre:'',
    descripcion:''
  }
  @Output() addedPlatillo = new EventEmitter<Platillo>();
  @Output() showPlatillo = new EventEmitter<string>();


  constructor() { }

  // ngOnInit(): void {
  // }

  onAddtoCart(){
  this.addedPlatillo.emit(this.platillo);
  }

  onShowDetail(){
    this.showPlatillo.emit(this.platillo.id);
  }
}
