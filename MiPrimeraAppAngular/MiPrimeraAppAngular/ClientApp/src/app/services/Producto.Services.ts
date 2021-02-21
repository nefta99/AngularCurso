import { Injectable,Inject } from '@angular/core';
import { Http } from '@angular/http';
import { inject } from '@angular/core/src/render3';
import { getBaseUrl } from '../../main';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
@Injectable()

export class ProductoServices {

  urlBase: string = "";

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.urlBase = baseUrl;//para sacar el nombre del dominio
  }
  ////////////////////////////////////METODOS/////////////////////////////////////////////////////////////
  public getProducto() {
    return this.http.get(this.urlBase + "api/Producto/listarProductos")
      .map(res => res.json());
  }
/******************************************************************************************************************/
  public obtenerProductoPorId(idProducto) {
    return this.http.get("api/Producto/obtenerProductoPorId/" + idProducto).map(res=> res.json())
  }
/*****************************************************************************************************************************/
  public listarMarcas() {
    return this.http.get("ap/Producto/listarMarcas").map(res => res.json());
  }

  /******************************************************************************************************/
  public getFiltroProductoPorNombre(nombre) {
    return this.http.get(this.urlBase +"api/Producto/filtraProductoPorNombre/" + nombre)
      .map(res => res.json());
  }
/******************************************************************************************************/
  public getFiltroProductoPorCategoria(idcategoria) {
    return this.http.get(this.urlBase + "api/Producto/filtraProductoPorCategoria/" + idcategoria).map(res => res.json());
  }
}
