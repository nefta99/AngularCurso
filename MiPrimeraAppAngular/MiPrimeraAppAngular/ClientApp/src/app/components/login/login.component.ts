import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import {Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: FormGroup;
  error: boolean=false;
  constructor(private usuarioServices: UsuarioService, private router: Router) {
    this.usuario = new FormGroup({
      'nombreusuario': new FormControl("", Validators.required),
      'contra': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.usuario.valid == true) {
      this.usuarioServices.login(this.usuario.value).subscribe(res => {
        if (res.iidusurio == 0) {
          //error
          this.error = true;
        } else {
          //Esta bien
          this.router.navigate(["/componente-bienvenida"]);
          this.error = false;

        }
      });
    }
  }
}
