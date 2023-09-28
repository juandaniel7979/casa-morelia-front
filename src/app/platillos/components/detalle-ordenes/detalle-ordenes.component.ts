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
  createOrder: PlatoV2[] = [];
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
  _id:        new FormControl<string>(''),
  platos: new FormControl<Plato[]>([],{ nonNullable: true }),
  adiciones: new FormControl<string[]>([]),
  descripcion: new FormControl(''),
});

get currentOrden(): Orden {
  const orden = this.ordenForm.value as Orden;
  return orden;
}

onAddOrder(){

  this.createOrder = this.storeService.getShoppingCartV2();
  const orden = {platos: this.createOrder} as OrdenV2
  this.ordenService.create(orden)
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
