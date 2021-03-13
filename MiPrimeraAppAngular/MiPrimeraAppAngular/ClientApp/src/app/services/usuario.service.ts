import { Injectable , Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable()
export class UsuarioService {

  baseUrl: string
  constructor(private http: Http, @Inject("BASE_URL") url: string, private router: Router) {
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
  public validarUsuario(idUsuario, nombre) {
    return this.http.get(this.baseUrl + "api/Usuario/validarUsuario/" + idUsuario + "/" + nombre).map(res => res.json());
  }


  public recuperarUsuario(idUsuario) {
    return this.http.get(this.baseUrl + "api/Usuario/recuperarUsuario/" + idUsuario).map(res => res.json());
  }

  public guardarDatos(usuarioCLS) {
    return this.http.post(this.baseUrl + "api/Usuario/guardarDatos", usuarioCLS).map(res => res.json());
  }

  public eliminarUsuario(idUsuario) {
    return this.http.get(this.baseUrl + "api/Usuario/eliminarUsuario/" + idUsuario).map(res => res.json());
  }
  public login(usuario) {
    return this.http.post(this.baseUrl + "api/Usuario/login", usuario).map(res => res.json());
  }
  public obtenerVariableSession(next) {
    return this.http.get("api/Usuario/obtenerVariableSession").map(res => {
      var data = res.json();
      var inf = data.valor;
      if (inf == "") {
        this.router.navigate(["/pagina-error"]);
        return false;
      }
      else {
        //Sacamos la pagina a la cual se quiere ingresar
        var pagina = next["url"][0].path;
        if (data.lista != null) {

          //Sacamos las paginas   que viene de base de datos
          var paginas = data.lista.map(pagina => pagina.accion);
          //Si esta la pagina vs la lista de pagina eso quiere dicir que si tiene permisos
          if (paginas.indexOf(pagina) > -1 && pagina != "Login")
          {
            return true;
          }
          else {
            this.router.navigate(["/pagina-error-permiso"]);
            return false;
          }
        }
        return true;
      }
    });
  }

  public listarPaginas() {
    return this.http.get(this.baseUrl + "api/Usuario/listarPaginas").map(res=> res.json());
  }

  public obtenerSession() {
    return this.http.get("api/Usuario/obtenerVariableSession").map(res => {
      var data = res.json();
      var inf = data.valor;
      if (inf == "") {        
        return false;
      }
      else {
        return true;
      }
    });
  }

  public cerrarSession() {
    return this.http.get("api/Usuario/cerrarSession").map(res => res.json());
  }

  public listarTipoUsuario() {
    return this.http.get(this.baseUrl + "api/TipoUsuario/listarTipoUsuario").map(res => res.json());
  }
  public listarPaginasTipoUsuario() {
    return this.http.get(this.baseUrl + "api/TipoUsuario/listarPaginasTipoUsuario").map(res => res.json());
  }
  public listarPaginasRecuperar(iidTipoUsuario) {
    return this.http.get(this.baseUrl + "api/TipoUsuario/listarPaginasRecuperar/" + iidTipoUsuario).map(res => res.json());
  }
  public guardarDatosTipoUsuario(tipoUsuarioCLS) {
    return this.http.post(this.baseUrl + "api/TipoUsuario/guardarDatosTipoUsuario", tipoUsuarioCLS).map(res => res.json());
  }
  public eliminarTipoUsuario(iidTipoUsuario) {
    return this.http.get(this.baseUrl + "api/TipoUsuario/eliminarTipoUsuario/" + iidTipoUsuario).map(res => res.json());
  }


  public listarPaginasBD() {
    return this.http.get(this.baseUrl + "api/Pagina/listarPaginasBD").map(res => res.json());
  }


}
