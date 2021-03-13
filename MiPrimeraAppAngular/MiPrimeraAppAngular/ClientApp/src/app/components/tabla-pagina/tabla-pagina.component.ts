import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService} from '../../services/usuario.service';
@Component({
  selector: 'tabla-pagina',
  templateUrl: './tabla-pagina.component.html',
  styleUrls: ['./tabla-pagina.component.css']
})
export class TablaPaginaComponent implements OnInit {
  paginas: any;
  cabeceras: string[] = ["id pagina", "nombre pagina", "Accion"];
  @Input() isMantenimiento: boolean = false;
  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
    this.usuarioServices.listarPaginasBD().subscribe(res => this.paginas = res);
  }

  eliminar(idPagina) {
    if (confirm("¿Desea eliminar el registro?") == true) {
      this.usuarioServices.eliminarPagina(idPagina).subscribe(data => {
        this.usuarioServices.listarPaginasBD().subscribe(res => this.paginas = res);
      });
    }

  }

}
