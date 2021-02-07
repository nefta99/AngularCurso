import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'buscador-persona-nombre-completo',
  templateUrl: './buscador-persona-nombre-completo.component.html',
  styleUrls: ['./buscador-persona-nombre-completo.component.css']
})
export class BuscadorPersonaNombreCompletoComponent implements OnInit {

  @Output() buscarNombre: EventEmitter<any>;

  constructor() {
    this.buscarNombre = new EventEmitter();
  }

  ngOnInit() {
  }

  public buscar(nombreCompleto) {
    //PARA conectarlo con el componente padre
    this.buscarNombre.emit(nombreCompleto);
  }

}
