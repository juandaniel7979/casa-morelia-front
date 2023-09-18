import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PlatillosRoutingModule } from './platillos-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';



@NgModule({
  declarations: [
    NewPageComponent,
    PlatilloComponent,
    PlatillosComponent,
    ConfirmDialogComponent,
    LayoutPageComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SwiperModule,
    MaterialModule,
    PlatillosRoutingModule
  ],
  exports:[

  ]
})
export class PlatillosModule { }
