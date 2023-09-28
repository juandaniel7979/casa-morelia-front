import { Component } from '@angular/core';
import { DragAndSortComponent } from '../../components/drag-and-sort/drag-and-sort.component';

@Component({
  selector: 'app-adiciones',
  templateUrl: './adiciones.component.html',
  styleUrls: ['./adiciones.component.css'],
  standalone:true,
  imports:[DragAndSortComponent]
})
export class AdicionesComponent {

}
