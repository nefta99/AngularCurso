import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PersonaService } from '../../services/persona.service';
@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {
  usuario: FormGroup;
  parametro: string = "";
  titulo: string = "";
  tipoUsuarios: any;
  personas: any;
  constructor(private activatedRouter: ActivatedRoute, private usuarioServices: UsuarioService,
    private personaServices: PersonaService) {
    this.usuario = new FormGroup({
      'iidusurio': new FormControl("0"),
      'nombreusuario': new FormControl(""),
      'contra': new FormControl(""),
      'iidpersona': new FormControl(""),
      'iidTipousuario': new FormControl("") 

    });
    ////////////////////////////////////////////////////
    this.activatedRouter.params.subscribe(param => {
      this.parametro = param["id"];

    });



  }

  ngOnInit() {

    this.usuarioServices.getTipoUsuario().subscribe(data => {
      this.tipoUsuarios = data;
    });


    this.personaServices.getPersona().subscribe(data => {
      this.personas = data;
    });

    if (this.parametro == "nuevo") {
      this.titulo = "Agregar usuario"
    }
    else {
      this.titulo = "Editar usuario"
    }
  }

}
