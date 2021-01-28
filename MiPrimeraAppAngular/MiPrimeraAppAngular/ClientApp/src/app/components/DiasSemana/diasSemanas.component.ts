import { Component } from '@angular/core'

@Component({
  selector: "DiasSemana",
  templateUrl: "./diasSemana.component.html"
})
export class DiasSemana {
  nombre: string = "Israelito";
  cursos: string[] = ["LinQ", "Ado.net", "Asp.net mvc", "Angular"];
  persona: Object = {
    nombre: "Pepe",
    apellido:"Perez"
  }
  enlace: string = "https://www.facebook.com/"
}
