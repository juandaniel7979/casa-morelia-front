import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { OrdenService } from 'src/app/ordenes/services/orden.service';
import { Orden, OrdenV2, Plato, PlatoV2 } from 'src/app/ordenes/models/orden.v2.model';
import { Platillo } from '../../models/platillo.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-ordenes',
  templateUrl: './detalle-ordenes.component.html',
  styleUrls: ['./detalle-ordenes.component.scss']
})
export class DetalleOrdenesComponent implements OnInit{


  ngOnInit(): void {
    this.storeService.myCart$.subscribe(platillos=>{
      this.counter = platillos.length;
    });
  }



  @Input() showOrdenDetail:boolean= false;


  total=0;
  counter=0;
  myShoppingCart: Plato[] = [];
  idsPlatos: PlatoV2[] = [];
  platilloChosen: Platillo={
    _id:'',
    precio:0,
    imagen:"",
    nombre:'',
    descripcion:'',
  };


constructor(
  private storeService: StoreService,
  private ordenService: OrdenService,
  private router: Router,
  private snackbar: MatSnackBar,
){
  this.myShoppingCart=this.storeService.getShoppingCart();
}


onSubmit():void {

  if ( this.ordenForm.invalid ) return;

  // if ( this.currentOrden.nro_mesa ) {
  //   this.ordenService.updateOrden( this.currentOrden )
  //     .subscribe( orden => {
  //       this.showSnackbar(`${ orden._id } updated!`);
  //     });

  //   return;
  // }

  this.ordenService.create( this.currentOrden )
    .subscribe( platillo => {
      // TODO: mostrar snackbar, y navegar a /heroes/edit/ platillo._id
      this.router.navigate(['/heroes/edit', platillo._id ]);
      this.showSnackbar(`${ platillo._id } created!`);
      this.router.navigate(['/']);
    });
}

togglePlatilloDetail(){
  console.log(this.showOrdenDetail)
  this.showOrdenDetail = !this.showOrdenDetail;
  this.total = this.getTotal();
  // console.log(this.total)
}


getTotal(){
  let total=0;
  this.myShoppingCart.forEach((item)=>{

    total+=item.plato.precio*item.cantidad!;
  });
  return total;
}

incrementarCantidadPlato(plato:string){
  if(this.myShoppingCart.some(e=> e.plato.nombre===plato)){
    const i = this.myShoppingCart.findIndex(e=> e.plato.nombre===plato);
    this.myShoppingCart[i].cantidad!+=1;
  }
  this.total = this.getTotal();
}
decrementarCantidadPlato(plato:string){
  if(this.myShoppingCart.some(e=> e.plato.nombre===plato)){
    const i = this.myShoppingCart.findIndex(e=> e.plato.nombre===plato);
    this.myShoppingCart[i].cantidad!-=1;
  }
  this.total = this.getTotal();
}

onShowDetail(id:string){
  this.togglePlatilloDetail();
}

deletePlatilloCart(platillo:Plato){
  this.storeService.delete(platillo)
}


public ordenForm = new FormGroup({
  platos: new FormControl<PlatoV2[]>([],{ nonNullable: true }),
  anotaciones: new FormControl<string>(''),
  nro_mesa: new FormControl<number>(0,{ nonNullable: true }),
});

get currentOrden(): OrdenV2 {
  this.ordenForm.patchValue({platos:this.storeService.getShoppingCartV2()})
  const orden = this.ordenForm.value as OrdenV2;
  return orden;
}

onAddOrder(){

  this.idsPlatos = this.storeService.getShoppingCartV2();
  // const orden = {platos: this.idsPlatos, nro_mesa:} as OrdenV2
  this.ordenService.create(this.currentOrden)
  .subscribe( orden => {
    this.router.navigate(['/ordenes', orden._id ]);
    this.showSnackbar(`La orden ${ orden._id } fue creada!`);
    this.voidCart()
    this.router.navigate(['/']);
  });
}

voidCart(){
  this.myShoppingCart=[];
  this.storeService.voidCart()
}


showSnackbar( message: string ):void {
  this.snackbar.open( message, 'done', {
    duration: 2500,
  })
}


}
