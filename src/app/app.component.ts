import { Component, Output, EventEmitter } from '@angular/core';
import { FilesService } from './shared/services/files.service';
// import { AuthService } from './services/auth.service';
// import { UsersService } from './services/users.service';
// import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

imgParent="https://www.w3schools.com/howto/img_avatar.png";
showImg=true;
token  = '';
imgRta='';


constructor(
  private filesService:FilesService
){

}

downloadPDF(){
  this.filesService.getFile('my.pdf','http://localhost:3001/api/files/dummy.pdf','application/pdf')
  .subscribe()
}

onUpload(event: Event){
  const element = event.target as HTMLInputElement;
  const file = element.files?.item(0);
  if(file){
    this.filesService.uploadFile(file)
    .subscribe(rta=>{
      this.imgRta=rta.location;
    })
  }
}


onLoaded(img:string){
  console.log('log padre ' +img)
}

toggleImg(){
  this.showImg=!this.showImg;
}

  img = 'https://source.unsplash.com/random';



  register ={
    name: '',
    email:'',
    password:''
  };


}
