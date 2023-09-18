import { Injectable } from '@angular/core';
import { Platillo } from '../models/platillo.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Platillo[] = [];
  private myCart = new BehaviorSubject<Platillo[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  AddPlatillo(platillo:Platillo){
    this.myShoppingCart.push(platillo);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,item)=>sum+item.precio,0);
  }
}
