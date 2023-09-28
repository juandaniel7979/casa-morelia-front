import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orden, OrdenV2, Ordenes } from '../models/orden.v2.model';
import { environment } from 'src/environments/environment';
import { zip, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  public ordenes: Orden[]=[];
  private apiUrl = `${environment.API_URL}/api/ordenes`;

  constructor(private http: HttpClient) { }


  getAll(){
    return this.http.get<Ordenes>(this.apiUrl);
  }

  getAllOrdenes(limit:number, offset:number) {
    let params= new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Ordenes>(this.apiUrl)
    .pipe(
      retry(3),
      map(ordenes=> ordenes.orden.map(item =>{
        return {
          ...item
        }
      }))
    );
  }

  fetchReadAndUpdate(id:string,orden:Orden){
    return zip(
      this.getOrdenById(id),
      this.updateOrden(orden),
    )
  }

  getOrdenById(id: string) {
      console.log(`${this.apiUrl}/${id}`)
    return this.http.get<Orden>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status ===HttpStatusCode.InternalServerError){
          return throwError('Algo está fallando en el server');
        }
        if(error.status ===404){
          return throwError('Ordeno no encontrado');
        }
        if(error.status ===HttpStatusCode.Unauthorized){
          return throwError('No tienes permitido ingresar acá');
        }
        return throwError('Ups, algo salió mal');
      })
    )
  }



  getOrdenesByPage(limit:number, offset:number){
    return this.http.get<Ordenes>(`${this.apiUrl}`,{params:{limit,offset}})
  }

  // create(platos:Orden){
  create(orden:OrdenV2){
    console.log(orden)
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // { headers:headers }
    return this.http.post<Orden>(this.apiUrl,orden);
  }


  // put, no es necesario pero se debería enviar toda la información requerida
  // patch, es mas para modificar un elemento puntual o todos
  updateOrden(orden: Orden){
    return this.http.put<Orden>(`${this.apiUrl}/${orden._id}`,orden);
  }

  deleteOrdenById(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }


}
