import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  producto: FormGroup;
  constructor() {
    this.producto = new FormGroup({
      'idproducto': new FormControl("0"),
      'nombre': new FormControl(""),
      'precio': new FormControl("0"),
      'stock': new FormControl("0")
    });
  }

  ngOnInit() {
  }

}
