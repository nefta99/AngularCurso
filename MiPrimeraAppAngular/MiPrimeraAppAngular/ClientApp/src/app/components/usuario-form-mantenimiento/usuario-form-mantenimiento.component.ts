import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(100)], this.noRepetirUsuario.bind(this)),
      'contra': new FormControl("", [Validators.required, , Validators.maxLength(100)]),
      'contra2': new FormControl("", [Validators.required, , Validators.maxLength(100), this.validarContraIguales.bind(this)]),
      'iidpersona': new FormControl("", [Validators.required]),
      'iidTipousuario': new FormControl("", [Validators.required]) 

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

  validarContraIguales(control: FormControl) {
    if (control.value != "" && control.value != null) {
      if (this.usuario.controls["contra"].value != control.value) {
        return { noIguales: true }
      }
      else {
        return null;
      }
    }
  }
  ///////////////
  noRepetirUsuario(control: FormControl) {

    //Para retorna una promesa, esto se consume en la validacion del correo.
    //Exactamente se conecta con esto: this.noRepetirCorreoInsertar.bind(this))
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.usuarioServices.validarUsuario(this.usuario.controls["iidusurio"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExiste: true })
            }
            else {
              resolve(null)
            }
          });
      }


    });
    return promesa;
  }

  //////////////
  guardarDatos() {

  }

}
