import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'filtrado-usuario-tipo-usuario',
  templateUrl: './filtrado-usuario-tipo-usuario.component.html',
  styleUrls: ['./filtrado-usuario-tipo-usuario.component.css']
})
export class FiltradoUsuarioTipoUsuarioComponent implements OnInit {

  usuarios: any;
  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
  }
  filtrar(tipoUsuario) {
    if (tipoUsuario.value == "") {
      this.usuarioServices.getUsuario().subscribe(data => this.usuarios = data);
    }
    else {
      this.usuarioServices.getFiltrarUsuarioPorTipo(tipoUsuario.value).subscribe(data => this.usuarios = data);
    }
  }
}
