
import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../services/orden.service';
import { Orden } from '../../models/orden.v2.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-ordenes-list',
  templateUrl: './ordenes-list.component.html',
  styles: [
  ]
})
export class OrdenesListComponent implements OnInit {

  ordenes: Orden[]= [];
  limit=10;
  offset=0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  OrdenChosen: Orden={
    platos:[],
    anotaciones:""
  };

  constructor(
  private ordenService:OrdenService
  ){}


  ngOnInit(): void {
    // this.ordenService.getOrdenesByPage(10,0)
    this.ordenService.getAllOrdenes(10,0)
    .subscribe(data=>{
      this.ordenes=data;
      this.offset +=this.limit;
      this.limit=5;
    })
  }

  // onAddtToShoppingCart(orden: Orden){
  //   this.ordenService.AddOrden(orden);
  //   this.total = this.ordenService.getTotal();
  // }


  // toggleOrdenDetail(){
  //   console.log(this.showOrdenDetail)
  //   this.showOrdenDetail = !this.showOrdenDetail;
  // }

  // onShowDetail(id:string){
  //   this.statusDetail='loading';
  //   this.toggleOrdenDetail();
  //   this.ordenService.getOrdenById(id)
  //   .subscribe(data=>{
  //     // this.toggleOrdenDetail();
  //     this.OrdenChosen = data;
  //     this.statusDetail = 'success';
  //   },errorMsg=>{
  //     // console.error(errorMsg.error.message)
  //     window.alert(errorMsg);
  //     this.statusDetail = 'error';
  //   })
  // }

  readAndUpdate(id: string){
    this.ordenService.getOrdenById(id)
    .pipe(
      switchMap((orden)=>this.ordenService.updateOrden(orden)),
    )
    .subscribe(data=>{
      console.log(data)
      });
      // Promise.all(doSomething(),doSomething2());
      this.ordenService.fetchReadAndUpdate(id,this.OrdenChosen)
      .subscribe(response=>{
        const read = response[0];
        const update = response[1];
      })
  }

  // createNewOrden(){
  //   const orden:Orden={
  //     _id:'',
  //     platos:[],
  //     adiciones:[],
  //     descripcion:'Nuevo Ordeno de prueba',
  //   }
  //   this.ordenService.create(orden)
  //   .subscribe(data=> {
  //     this.ordenes.unshift(data)
  //   })
  // }

  updateOrden(){
    this.ordenService.updateOrden(this.OrdenChosen)
    .subscribe(data=>{
      const OrdenIndex = this.ordenes.findIndex(item=> item._id===this.OrdenChosen._id);
      this.ordenes[OrdenIndex] = data;
      this.OrdenChosen=data;
    })
  }


  deleteOrden(){
    const id = this.OrdenChosen._id;
    this.ordenService.deleteOrdenById(id!)
    .subscribe(()=>{
      const OrdenIndex = this.ordenes.findIndex(item=> item._id===this.OrdenChosen._id);
      this.ordenes.splice(OrdenIndex,1);
    })
  }

  loadMore(){
    this.ordenService.getOrdenesByPage(this.limit,this.offset)
    .subscribe(data=>{
      if(data.orden.length===0)return;
      this.ordenes=this.ordenes.concat(data.orden);
      this.offset+=5;
    })
  }


}
