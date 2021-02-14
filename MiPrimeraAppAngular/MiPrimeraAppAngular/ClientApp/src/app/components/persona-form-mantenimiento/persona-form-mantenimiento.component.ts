import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
//router por codigo
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-persona-form-mantenimiento',
  templateUrl: './persona-form-mantenimiento.component.html',
  styleUrls: ['./persona-form-mantenimiento.component.css']
})
export class PersonaFormMantenimientoComponent implements OnInit {

  persona: FormGroup;
  constructor(private personaServices: PersonaService, private router: Router) {
    this.persona = new FormGroup(
      {
        'iidpersona': new FormControl("0"),
        'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
        'apPaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'apMaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)]),
        'correo': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")])
      }
    );
  }

  ngOnInit() {
  }
  guardarDatos() {
    if (this.persona.valid == true) {
      this.personaServices.agregarPersona(this.persona.value).subscribe(data => { this.router.navigate(["/mantenimiento-persona"]) });
    }
  }

}
