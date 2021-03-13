import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService} from '../../services/usuario.service';
@Component({
  selector: 'app-tabla-pagina',
  templateUrl: './tabla-pagina.component.html',
  styleUrls: ['./tabla-pagina.component.css']
})
export class TablaPaginaComponent implements OnInit {
  paginas: any;
  cabeceras: string[] = ["id pagina", "nombre pagina", "Accion"];
  @Input() isMantenimiento: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
