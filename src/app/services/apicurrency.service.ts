import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApicurrencyService {

  protected BaseApiUrl!:string;
  constructor(private Http_s:HttpService) {
    this.BaseApiUrl=environment.ApiCurrenciesUrl;//LLamado de la primera partede la URL
  }

  changeValue(currencyOriginal:string,currencyChange:string,value:string){
    return this.Http_s.get(this.BaseApiUrl+"to="+currencyOriginal+"&from="+currencyChange+"&amount="+value,true);
    /**Declaración del servicio, aquí se llamada al service HTTP y el método GET para enviar la nueva URL
     * y el valor del segundo parametro es TRUE porque en este caso necesitamos enviar HEADERS a la API
     * que sería la APIKEY, esto para que nos permita acceder a la API y convertir
     */
  }
}
