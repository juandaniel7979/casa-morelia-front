
import { Component, OnInit } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { single } from 'rxjs';
import {PlatillosService} from '../../../platillos/services/platillos.service'
import { CreatePlatilloDTO, Platillo } from '../../models/platillo.model';
import { StoreService } from '../../services/store.service';
import { OrdenService } from 'src/app/ordenes/services/orden.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { Plato, Orden, PlatoV2, OrdenV2 } from 'src/app/ordenes/models/orden.v2.model';


@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.scss']
})
export class PlatillosComponent implements OnInit {
  // today = new Date();
  // date = new Date(2021, 1 ,21)
  myShoppingCart: Plato[] = [];
  createOrder: PlatoV2[] = [];
  total=0;
  platillos: Platillo[]= [];
  showPlatilloDetail = false;
  platilloChosen: Platillo={
    _id:'',
    precio:0,
    imagen:"",
    nombre:'',
    descripcion:'',
  };
  limit=10;
  offset=0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  constructor(
    private storeService: StoreService,
    private ordenService: OrdenService,
    private platilloService:  PlatillosService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    this.myShoppingCart=this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.platilloService.getPlatillosByPage(10,0)
    this.platilloService.getAllPlatillos(10,0)
    .subscribe(data=>{
      this.platillos=data;
      this.offset=this.limit;
      this.limit=5;
    })
  }

  onAddtToShoppingCart(platillo: Platillo){
    this.storeService.AddPlatillo(platillo);
    this.total = this.storeService.getTotal();
  }


  togglePlatilloDetail(){
    console.log(this.showPlatilloDetail)
    this.showPlatilloDetail = !this.showPlatilloDetail;
  }

  onShowDetail(id:string){
    this.statusDetail='loading';
    this.togglePlatilloDetail();
    this.platilloService.getPlatilloById(id)
    .subscribe(data=>{
      // this.togglePlatilloDetail();
      this.platilloChosen = data;
      this.statusDetail = 'success';
    },errorMsg=>{
      // console.error(errorMsg.error.message)
      window.alert(errorMsg);
      this.statusDetail = 'error';
    })
  }

  readAndUpdate(id: string){
    this.platilloService.getPlatilloById(id)
    .pipe(
      switchMap((platillo)=>this.platilloService.updatePlatillo(platillo)),
    )
    .subscribe(data=>{
      console.log(data)
      });
      // Promise.all(doSomething(),doSomething2());
      this.platilloService.fetchReadAndUpdate(id,this.platilloChosen)
      .subscribe(response=>{
        const read = response[0];
        const update = response[1];
      })
  }

  createNewPlatillo(){
    const platillo:CreatePlatilloDTO={
      nombre:'Nuevo platilloo',
      descripcion:'Nuevo platilloo de prueba',
      imagen:"",
      precio:5000
    }
    this.platilloService.create(platillo)
    .subscribe(data=> {
      this.platillos.unshift(data)
    })
  }

  updatePlatillo(){
    this.platilloService.updatePlatillo(this.platilloChosen)
    .subscribe(data=>{
      const platilloIndex = this.platillos.findIndex(item=> item._id===this.platilloChosen._id);
      this.platillos[platilloIndex] = data;
      this.platilloChosen=data;
    })
  }

  deletePlatilloCart(platillo:Plato){
    this.storeService.delete(platillo)
  }

  deletePlatillo(){
    const id = this.platilloChosen._id;
    this.platilloService.deletePlatilloById(id)
    .subscribe(()=>{
      const platilloIndex = this.platillos.findIndex(item=> item._id===this.platilloChosen._id);
      this.platillos.splice(platilloIndex,1);
    })
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }


  loadMore(){
    this.platilloService.getPlatillosByPage(this.limit,this.offset)
    .subscribe(data=>{
      if(data.length===0)return;
      this.platillos=this.platillos.concat(data);
      this.offset+=5;
    })
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
    // const {cantidad,plato, } = this.myShoppingCart.map((item)=>{
    //   return item;
    // })
    // console.log(ids)
    // this.ordenForm.patchValue({platos:this.myShoppingCart})
    this.createOrder = this.storeService.getShoppingCartV2();
    const orden = {platos: this.createOrder} as OrdenV2
    this.ordenService.create(orden)
    .subscribe( orden => {
      this.router.navigate(['/ordenes', orden._id ]);
      this.showSnackbar(`La orden ${ orden._id } fue creada!`);
      this.router.navigate(['/']);
    });
  }


}
