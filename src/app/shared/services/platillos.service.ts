import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {retry,catchError, map} from 'rxjs/operators'
import { CreatePlatilloDTO, Platillo, UpdatePlatilloDTO } from '../models/platillo.model';
import { throwError, zip } from 'rxjs';
import { Platillos } from '../models/platillos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  // constructor(
  //   private http: HttpClient
  // ) {
  // }

  // getAllPlatillos(){
  //   return this.http.get<Platillo[]>('https://fakestoreapi.com/platillos');
  // }

  private apiUrl = `${environment.API_URL}/api/plato`;
  // private apiUrl = 'https://young-sands-07814.herokapp.com/api/platillos';
  // private apiUrl = 'http://localhost:3001/api/platillos';

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<Platillo>(this.apiUrl);
  }

  getAllPlatillos(limit:number, offset:number) {
    let params= new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Platillo[]>(this.apiUrl)
    .pipe(
      retry(3),
      map(platillos=> platillos.map(item =>{
        return {
          ...item
        }
      }))
    );
  }

  fetchReadAndUpdate(id:string,dto:UpdatePlatilloDTO){
    return zip(
      this.getPlatillo(id),
      this.update(id,dto),
    )
  }

  getPlatillo(id: string) {
    return this.http.get<Platillo>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status ===HttpStatusCode.InternalServerError){
          return throwError('Algo está fallando en el server');
        }
        if(error.status ===404){
          return throwError('Platilloo no encontrado');
        }
        if(error.status ===HttpStatusCode.Unauthorized){
          return throwError('No tienes permitido ingresar acá');
        }
        return throwError('Ups, algo salió mal');
      })
    )
  }



  getPlatillosByPage(limit:number, offset:number){
    return this.http.get<Platillo[]>(`${this.apiUrl}/`,{params:{limit,offset}})
  }

  create(dto:CreatePlatilloDTO){
    return this.http.post<Platillo>(this.apiUrl,dto);
  }


  // put, no es necesario pero se debería enviar toda la información requerida
  // patch, es mas para modificar un elemento puntual o todos
  update(id:string, dto:UpdatePlatilloDTO){
    return this.http.put<Platillo>(`${this.apiUrl}/${id}`,dto);
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }



}
