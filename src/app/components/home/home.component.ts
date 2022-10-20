import { Component } from '@angular/core';
import { ApiConService } from 'src/app/services/api-con.service';
import { ApicurrencyService } from 'src/app/services/apicurrency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //Variables donde se almacena el valor seleccionado en cada opcion del formulario
  selectionType:string="";
  selectionBrand:string="";
  selectionModel:string="";
  selectionAnio:string="";

  //Variables donde se almacenarán las respuestas de cada llamado a la API
  resBrand!:any;
  resModel!:any;
  resAnio!:any;
  totalRes!:any;
  resConvertion!:any;

  //Variables utilizadas para mostrar el resultado final de la busqueda
  dataShow:boolean=false; //Datashow muestra o no el la información completa del vehiculo consultado.
  pesosVal!:number; //Guarda el valor en pesos
  taxValue!:number; //Guarda el valor de los impuestos
  showTax:number=0; //Selecciona el porcentaje a pagar dependiendo del tipo de vehiculo (Gasolina,Diesel,Electrico)


  constructor(
    //LLamada a los serivicios tanto de Currencies y de vehiculos
    private apiSVC:ApiConService,
    private apiCurrencies: ApicurrencyService
    ) { }

  catchDataType(){//Función que se activa cuando el usuario eligió entre (Moto, Carro, Camion)

    this.resBrand=[];
    this.resModel=[];
    this.resAnio=[];
    this.selectionBrand="";
    this.selectionModel="";
    this.selectionAnio="";
    /**Las anteriores variables se reinician para el caso en el que el usuario desde cambiar de vehiculo
     * no salga la información anteriormente buscada
     */

    this.apiSVC.find(this.selectionType+"/marcas").subscribe(res=>this.resBrand=res);//Llamado de la api
  }
  catchDataBrand(){
    this.resModel=[];
    this.resAnio=[];
    this.selectionModel="";
    this.selectionAnio="";
    this.apiSVC.find(this.selectionType+"/marcas/"+this.selectionBrand+"/modelos").subscribe((res:any)=>this.resModel=res.modelos);
  }
  catchDataModels(){
    this.resAnio=[];
    this.selectionAnio="";
    this.apiSVC.find(this.selectionType+"/marcas/"+this.selectionBrand+"/modelos/"+this.selectionModel+"/anos").subscribe((res:any)=>this.resAnio=res);
  }
  catchDataAnio(){
    this.apiSVC.find(this.selectionType+"/marcas/"+this.selectionBrand+"/modelos/"+this.selectionModel+"/anos/"+this.selectionAnio).
    subscribe((res:any)=>{//LLamado  final cuando ya se verificarón los 4 campos
      this.dataShow=true; //Permite mostrar la información final en el HTML
      this.totalRes=res //Variable que almacena la respuesta del vehiculo buscado
      let newVal = this.totalRes.Valor.slice(3,-3);
      //En este caso el VALOR del vehiculo viene en un string con 3 espacio al inicio y
      // 3 al final que no son necesarios y los cuales son removidos en la anterior linea.
      newVal = newVal.replace(".","");//En este caso al arreglo se le quitan lo puntos para poder eviar a la API de currencies
      newVal = newVal.replace(".","");// Este es un medio preventivo por si el número tiene más de un punto como en el caso de un carro que valga más de 1 millón
      this.apiCurrencies.changeValue("COP","BRL",newVal).subscribe(//Llamado a la API currencies, se le envia moneda que buscamos, moneda que queremos converitr y el valor que debe estar en string sin puntos.
        (res:any)=>{
          this.pesosVal = Math.trunc(res.result)//Solo selecciona el valor convertido sin decimales
          if(this.totalRes.Combustivel=='Gasolina'){ //Dependiendo del carro se hace el cálculo correspondiente para el impuesto
            this.taxValue=Math.trunc(0.05*this.pesosVal);//Se quitan decimales a la respuesta
            this.showTax=5;// se la el numero del porcentaje a pagar
          }else if(this.totalRes.Combustivel=='Diesel'){
            this.taxValue=Math.trunc(0.025*this.pesosVal);
            this.showTax=2.5;
                }else{
                  this.taxValue=Math.trunc(0.01*this.pesosVal);
                  this.showTax=1;
                }
        });
    });

  }
  cleanAll(){//CUando el botón limpiar es seleccionado se limpian todas las variables y se reinician a un valor vacio.
    this.resBrand=[];
    this.resModel=[];
    this.resAnio=[];
    this.totalRes=[]
    this.selectionType="";
    this.selectionBrand="";
    this.selectionModel="";
    this.selectionAnio="";
    this.dataShow=false;//no muestra la información anterior
    this.taxValue=0;
  }
}

