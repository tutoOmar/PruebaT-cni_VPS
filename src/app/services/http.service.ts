import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private header = new HttpHeaders({apiKey : environment.ApiKey}); //Creacion del header Utilizado en el
                                                                    //llamado de la API currencies

  constructor(private http:HttpClient ) {
  }

  /*Servicio general HTTP para hacer el llamado a las APis*/
  public get<T>(url:string,activateHeader:boolean){
    return this.http.get<T>(url,activateHeader ? { headers: this.header }: {});
  }
}
