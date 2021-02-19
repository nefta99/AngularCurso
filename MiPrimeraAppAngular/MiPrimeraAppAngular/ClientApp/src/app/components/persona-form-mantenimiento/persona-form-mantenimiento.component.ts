import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//hemos llamado al servicio PersonaService
import { PersonaService } from '../../services/persona.service';
//router por codigo
import { Route, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-persona-form-mantenimiento',
  templateUrl: './persona-form-mantenimiento.component.html',
  styleUrls: ['./persona-form-mantenimiento.component.css']
})
export class PersonaFormMantenimientoComponent implements OnInit {

  persona: FormGroup;
  titulo: string;
  parametro: string;
  constructor(private personaServices: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.persona = new FormGroup(
      {
        'iidpersona': new FormControl("0"),
        'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
        'apPaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'apMaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)]),
        'correo': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")]),
        'fechaNacimiento': new FormControl("", Validators.required)
      }
    );
    this.activatedRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando una nueva persona";
      }
      else {
        this.titulo = "Editando una nueva persona";
      }
    });
  }

  
  ngOnInit() {
    //Programar obtener los varlores
    if (this.parametro != "nuevo") {
      this.personaServices.recuperarPersona(this.parametro).subscribe(param => {
        //programar
        this.persona.controls["iidpersona"].setValue(param.iidpersona);
        this.persona.controls["nombre"].setValue(param.nombre);
        this.persona.controls["apPaterno"].setValue(param.apPaterno);
        this.persona.controls["apMaterno"].setValue(param.apMaterno);
        this.persona.controls["telefono"].setValue(param.telefono);
        this.persona.controls["correo"].setValue(param.correo);
        //var s = param.fechaCadena;
        this.persona.controls["fechaNacimiento"].setValue(param.fechaCadena);

      });
    }
  }
  guardarDatos() {
    //2009-10-12
    //C# dd/mm/yyyy
    var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
    var anio = fechaNac[0];
    var mes = fechaNac[1];
    var dia = fechaNac[2];
    console.log("añio " + anio);
    console.log("mes " + mes);
    console.log("dia " + dia);
    this.persona.controls["fechaNacimiento"].setValue(mes + "/" + dia + "/" + anio);
    //siempre tiene que estar valido antes de agrgar o editar
    if (this.persona.valid == true) {        
        this.personaServices.agregarPersona(this.persona.value).subscribe(data => { this.router.navigate(["/mantenimiento-persona"]) });    
    }
  }

}
