import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';


//Registrar el componente Creado ejemplo del curso
import { ButtonAgregar } from './components/button/Button.component';
import { DiasSemana } from './components/DiasSemana/diasSemanas.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';

/*Aqui se incluyen los servicios*/
import { ProductoServices } from './services/Producto.Services'
import { CategoriaService} from './services/categoria.service';
/*fin del los servicios*/
import { HttpModule } from '@angular/http';
import { BuscadorProductoNombreComponent } from './components/buscador-producto-nombre/buscador-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscadorProductoCategoriasComponent } from './components/buscador-producto-categorias/buscador-producto-categorias.component';
import { FiltradoProductoCategoriaComponent } from './components/filtrado-producto-categoria/filtrado-producto-categoria.component'

@NgModule({
  declarations: [
    //Aqui van los componentes
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ButtonAgregar,
    DiasSemana,
    TablaProductoComponent,
    BuscadorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscadorProductoCategoriasComponent,
    FiltradoProductoCategoriaComponent
  ],
  imports: [
    // el import va el HttpModule, lo que puso arriba
    HttpModule, 
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'filtradoProductoCategoria', component: FiltradoProductoCategoriaComponent, pathMatch: 'full' },
      { path: 'filtradoProductoNombre', component: FiltradoProductoNombreComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'diaSemana', component: DiasSemana },
    ])
  ],
  //providers: en esta parte van los servicios
  providers: [ProductoServices, CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
