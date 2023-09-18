import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Menu', icon: 'label', url: '/' },
    { label: 'Añadir', icon: 'add', url: 'platillo/new-platillo' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

}
