import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdicionesComponent } from './pages/adiciones/adiciones.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-platillo', component: NewPageComponent },
      { path: 'edit/:id', component: NewPageComponent },
      { path: 'adiciones', component: AdicionesComponent },
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
export class PlatillosRoutingModule { }
