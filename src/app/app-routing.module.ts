import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutPageComponent } from './platillos/pages/layout-page/layout-page.component';
import { PlatillosComponent } from './platillos/components/platillos/platillos.component';

const routes: Routes = [
  {
    path:'',
    component: PlatillosComponent
  },
  {
    path:'contact',
    component: AppComponent
  },
  {
    path:'platillos',
    loadChildren: () => import('./platillos/platillos.module').then( m => m.PlatillosModule)
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
