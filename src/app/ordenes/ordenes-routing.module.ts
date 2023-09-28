import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewOrdenComponent } from './pages/new-orden/new-orden.component';
import { OrdenesListComponent } from './pages/ordenes-list/ordenes-list.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: OrdenesListComponent },
      { path: 'new-orden', component: NewOrdenComponent },
      { path: 'edit/:id', component: NewOrdenComponent },
      { path: '**', redirectTo: '/' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
})
export class OrdenesRoutingModule { }
