import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent {

  @Input()
  toggleCart:boolean=true;

  @Output() cartClick = new EventEmitter();

  onCartClick(){
    this.toggleCart = ! this.toggleCart;
    this.cartClick.emit();
  }
}
