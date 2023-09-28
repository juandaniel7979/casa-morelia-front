import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChip, MatChipListboxChange } from '@angular/material/chips';

@Component({
  selector: 'app-chips-multi-select',
  templateUrl: './chips-multi-select.component.html',
  styles: [
  ]
})
export class ChipsMultiSelectComponent {

  @Input() options: string[] = [];

  private selectedOptions:string[] = [];

//   toggleSelection(chip: MatChip) {
//     chip.toggleSelected();
//  }

public platilloForm = new FormGroup({
  adiciones: new FormControl<string[]>([]),
});


patchFooBar(changes: MatChipListboxChange) {
  console.log(changes)
  if (!changes.value) return;
  if (changes.value) {
    setTimeout(() => {
      // Wait next changes
      this.selectedOptions.push(changes.value)
      console.log('this.selectedOptions')
      console.log(this.selectedOptions)
      this.platilloForm.patchValue({adiciones:changes.value})
    }, 0)
  }
  console.log('this.platilloForm.value')
  console.log(this.platilloForm.value)
}

// public toggleSelection(event: any) {
//   console.log(event);
// }

}
