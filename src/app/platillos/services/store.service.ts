import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Plato, PlatoV2 } from 'src/app/ordenes/models/orden.v2.model';
import { Platillo } from '../models/platillo.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCartV2: PlatoV2[] = [];
  private myShoppingCart: Plato[] = [];
  private myCart = new BehaviorSubject<Plato[]>([]);
  // private cartActive = new BehaviorSubject<boolean>(false);
  private cartActive:boolean= false;

  myCart$ = this.myCart.asObservable();

  constructor() { }

  AddPlatillo(platillo:Platillo){
    const plato = {_id:'',plato:platillo,cantidad:1,adiciones:[]} as Plato
    const platoV2 = {_id:'',plato:platillo._id,cantidad:1,adiciones:[]} as PlatoV2

    if(this.myShoppingCart.some(e => e.plato.nombre=== platillo.nombre)) {
      const i=this.myShoppingCart.findIndex(e => e.plato.nombre=== platillo.nombre)
      this.myShoppingCart[i].cantidad!+=1;
      this.myCart.next(this.myShoppingCart);
      return;
    }

    this.myShoppingCart.push(plato);
    this.myShoppingCartV2.push(platoV2);
    this.myCart.next(this.myShoppingCart);
  }

  delete(platillo:Plato){
    const platilloIndex = this.myShoppingCart.findIndex(item=> item.plato._id===platillo.plato._id);
      this.myShoppingCart.splice(platilloIndex,1);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart
  }

  getShoppingCartV2(){
    // this.myShoppingCart.forEach(item=>{
    //   const plato = {_id:'',plato:item.plato._id,cantidad:1,adiciones:[]} as PlatoV2
    //   console.log(plato)
    //   console.log(item.plato._id)
    //   this.myShoppingCartV2.push(plato)
    // })
    // console.log(this.myShoppingCartV2)
    return this.myShoppingCartV2
  }


  voidCart(){
    this.myShoppingCart=[];
    this.myShoppingCartV2=[];
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,item)=>sum+item.plato.precio,0);
  }

  getToggleCart(){
    return this.cartActive;
  }

  toggleCart(flag:boolean){
    this.cartActive=flag;
  }
}
