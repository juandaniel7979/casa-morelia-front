import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './components/nav/nav.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { SwiperModule } from 'swiper/angular';
import { ImgComponent } from './components/img/img.component';
import { CardComponent } from './components/card/card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavComponent,
    PlatilloComponent,
    PlatillosComponent,
    ImgComponent,
    CardComponent,
    SidebarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SwiperModule,
  ],
  exports:[
    NavComponent,
    PlatilloComponent,
    PlatillosComponent,
    ImgComponent,
    CardComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
