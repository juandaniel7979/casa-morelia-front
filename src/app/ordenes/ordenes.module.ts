import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesListComponent } from './pages/ordenes-list/ordenes-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewOrdenComponent } from './pages/new-orden/new-orden.component';



@NgModule({
  declarations: [
    OrdenesListComponent,
    LayoutPageComponent,
    NewOrdenComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    OrdenesRoutingModule

  ],
  exports:[

  ]
})
export class OrdenesModule { }
