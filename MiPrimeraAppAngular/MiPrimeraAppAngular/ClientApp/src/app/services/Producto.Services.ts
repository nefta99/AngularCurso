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

  public getProducto() {
    return this.http.get(this.urlBase + "api/Producto/listarProductos")
      .map(res => res.json());
  }

}
