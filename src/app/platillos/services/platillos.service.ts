import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {retry,catchError, map} from 'rxjs/operators'
import { throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePlatilloDTO, Platillo, UpdatePlatilloDTO } from '../models/platillo.model';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {



  private apiUrl = `${environment.API_URL}/api/plato`;

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

  fetchReadAndUpdate(id:string,platillo:Platillo){
    return zip(
      this.getPlatilloById(id),
      this.updatePlatillo(platillo),
    )
  }

  getPlatilloById(id: string) {
      console.log(`${this.apiUrl}/${id}`)
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
  updatePlatillo(platillo: Platillo){
    return this.http.put<Platillo>(`${this.apiUrl}/${platillo._id}`,platillo);
  }

  deletePlatilloById(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }



}
