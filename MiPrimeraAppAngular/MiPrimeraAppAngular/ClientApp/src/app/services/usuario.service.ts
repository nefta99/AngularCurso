import { Injectable , Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UsuarioService {

  baseUrl: string
  constructor(private http: Http, @Inject("BASE_URL") url: string) {
    this.baseUrl = url;
  }
  public getUsuario() {
    return this.http.get(this.baseUrl + "api/Usuario/listarUsuario").map(res => res.json());
  }
  public getTipoUsuario() {
    return this.http.get(this.baseUrl + "api/Usuario/listarTipoUsuario").map(res => res.json());
  }
  public getFiltrarUsuarioPorTipo(idTipo) {
    return this.http.get(this.baseUrl + "api/Usuario/filtrarUsuarioPorTipo/" + idTipo).map(res => res.json());
  }
}