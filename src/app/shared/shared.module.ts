import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { ImgComponent } from './components/img/img.component';
import { CardComponent } from './components/card/card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { PlatillosModule } from '../platillos/platillos.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ImgComponent,
    CardComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    ImgComponent,
    CardComponent,
    SidebarComponent,
    MaterialModule
  ]
})
export class SharedModule { }
