import { Injectable } from '@angular/core';
import { Platillo } from '../models/platillo.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Platillo[] = [];
  private myCart = new BehaviorSubject<Platillo[]>([]);
  // private cartActive = new BehaviorSubject<boolean>(false);
  private cartActive:boolean= false;

  myCart$ = this.myCart.asObservable();

  constructor() { }

  AddPlatillo(platillo:Platillo){
    this.myShoppingCart.push(platillo);
    this.myCart.next(this.myShoppingCart);
  }

  delete(platillo:Platillo){
    const platilloIndex = this.myShoppingCart.findIndex(item=> item._id===platillo._id);
      this.myShoppingCart.splice(platilloIndex,1);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,item)=>sum+item.precio,0);
  }

  getToggleCart(){
    return this.cartActive;
  }

  toggleCart(flag:boolean){
    this.cartActive=flag;
  }
}
