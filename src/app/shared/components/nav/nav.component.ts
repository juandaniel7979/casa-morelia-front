import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { StoreService } from 'src/app/platillos/services/store.service';
// import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent  {


  @Output() cartClick = new EventEmitter();


  onCartClick(){
    this.cartClick.emit('cart clicked')
  }

  // token='';
  activeMenu = false;
  counter=0;
  profile:User | null = null;

  constructor(
    private storeService:StoreService,
    private authService:AuthService,
    private usersService:UsersService
  ) { }



  activarMenu(){
    this.activeMenu= ! this.activeMenu;
    this.storeService.toggleCart(this.activeMenu);
    console.log(this.activeMenu)
  }

  // createUser(){
  //   this.usersService.create({
  //     name:'juan',
  //     email:"juan@gmail.com",
  //     password:'123456'
  //   })
  //   .subscribe(rta=>{
  //     console.log(rta);
  //   });
  // }

  // login(){
  //   this.authService.login('juan@gmail.com','123456')
  //   .subscribe(rta=>{
  //     console.log(rta.access_token);
  //     this.token = rta.access_token;
  //     this.getProfile();
  //   });
  // }
  // login(){
  //   this.authService.loginAndGet('juan@gmail.com','123456')
  //   .subscribe(user=>{
  //     this.profile=user;
  //   });
  // }


  // getProfile(){
  //   this.authService.profile(this.token)
  //   .subscribe(user=>{
  //     console.log(user);
  //     this.profile = user;
  //   })
  // }


  ngOnInit(): void {
    this.storeService.myCart$.subscribe(platillos=>{
      this.counter = platillos.length;
    });
  }

}
