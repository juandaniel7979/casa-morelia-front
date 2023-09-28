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
import { FabComponent } from './components/fab/fab.component';
import { ChipsMultiSelectComponent } from './components/chips-multi-select/chips-multi-select.component';
import { DetalleOrdenesComponent } from './components/detalle-ordenes/detalle-ordenes.component';
import { AdicionesComponent } from './pages/adiciones/adiciones.component';
import { DragAndSortComponent } from './components/drag-and-sort/drag-and-sort.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    NewPageComponent,
    PlatilloComponent,
    PlatillosComponent,
    ConfirmDialogComponent,
    LayoutPageComponent,
    UploadFileComponent,
    FabComponent,
    ChipsMultiSelectComponent,
    DetalleOrdenesComponent,

    ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SwiperModule,
    MaterialModule,
    PlatillosRoutingModule,
    DragDropModule
  ],
  exports:[

  ]
})
export class PlatillosModule { }
