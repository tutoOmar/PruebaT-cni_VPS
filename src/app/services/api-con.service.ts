import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConService {

  protected BaseApiUrl!:string;
  constructor(private Http_s:HttpService) {
    this.BaseApiUrl=environment.ApiUrl;//Llamado de la primera del URL de la Api de vehiculos.
  }

  find(urlComplement:string){
    return this.Http_s.get(this.BaseApiUrl+urlComplement,false);//LLamado de la APi de carros
    //En este caso el segundo parametro es FALSE porque no requiere Headers para autentificarse
  }
}
