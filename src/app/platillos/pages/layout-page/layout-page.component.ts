import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from 'src/app/shared/components/nav/nav.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  standalone:true,
  imports:[NavComponent, RouterModule]

})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Menu', icon: 'label', url: '/' },
    { label: 'Añadir', icon: 'add', url: 'platillo/new-platillo' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

}
