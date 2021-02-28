import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {

  parametro: string = "";
  titulo: string = "";
  constructor(private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(param => {
      this.parametro = param["id"];

    });



  }

  ngOnInit() {
    if (this.parametro == "nuevo") {
      this.titulo = "Agregar usuario"
    }
    else {
      this.titulo = "Editar usuario"
    }
  }

}
