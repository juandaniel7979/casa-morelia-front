import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PlatillosComponent } from './shared/components/platillos/platillos.component';

// import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
// import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
// import { HomePageComponent } from './shared/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path:'',
    component:AppComponent
  },
  {
    path:'platillos',
    component: PlatillosComponent
  },
  {
    path:'contact',
    component: AppComponent
  },
  // {
  //   path:'countries',
  //   loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
  // },
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
