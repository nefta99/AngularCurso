import { Component, OnInit , Input} from '@angular/core';
import { PersonaService } from '../../services/persona.service';
@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

  //Con @Input() hace que se haga la variable como una propiedad en el html
  @Input() personas: any;
  @Input() isMantenimiento = false;
  cabeceras :string[]=["Id prosona","Nombre Completo","Telefono","Correo"]
  constructor(private personaService: PersonaService) {
  }

  ngOnInit() {
    //Instanciamos con el services de personas
    this.personaService.getPersona().subscribe(data => this.personas = data);
  }

}
