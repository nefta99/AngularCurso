import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'pagina-form-mantenimiento',
  templateUrl: './pagina-form-mantenimiento.component.html',
  styleUrls: ['./pagina-form-mantenimiento.component.css']
})
export class PaginaFormMantenimientoComponent implements OnInit {
  pagina: FormGroup;
  constructor() {
    this.pagina = new FormGroup({
      "iidpagina": new FormControl("0"),
      "mensaje": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "accion": new FormControl("", [Validators.required, Validators.maxLength(100)])
    });
  }

  ngOnInit() {
  }

  guardarDatos() {

  }
}
