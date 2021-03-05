import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ver: boolean = true;
  constructor(private activatedRouter: ActivatedRoute,
    private usuarioServices: UsuarioService,
    private personaServices: PersonaService,
    private router: Router) {
    //Se  instancia el usuario
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
      if (this.parametro == "nuevo") {
        this.ver = true;
      }
      else {
        this.ver = false;
        this.usuarioServices.recuperarUsuario(this.parametro).subscribe(data => {
          this.usuario.controls["iidusurio"].setValue(data.iidusurio);
          this.usuario.controls["nombreusuario"].setValue(data.nombreusuario);
          this.usuario.controls["iidTipousuario"].setValue(data.iidTipousuario);

          this.usuario.controls["contra"].setValue("1");
          this.usuario.controls["contra2"].setValue("1");
          this.usuario.controls["iidpersona"].setValue("1");
        });


     
        
      }
    });

  }
  //////Fin del contructor

  ngOnInit() {
    //Metodo para llenar el combo de TipoUsuario
    this.usuarioServices.getTipoUsuario().subscribe(data => {
      this.tipoUsuarios = data;
    });

    //Metodo para llenar el combo de Persona o iidpersona
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
  ///fin de ngOnInit

  //Metodo para validar que las contraseñas no sean iguales
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
  //////////Metodo para no repetir usuario/////
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

  ////////Metodo para guardar los datos en la base de datos//////
  guardarDatos() {
    if (this.usuario.valid == true) {
      
      this.usuarioServices.guardarDatos(this.usuario.value).subscribe(res => {
        //Esta linea proviende de la libreria Router
        this.router.navigate(["/mantenimiento-usuario"])
      });
    }
  }

}
