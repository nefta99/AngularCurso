import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: FormGroup;
  constructor() {
    this.usuario = new FormGroup({
      'nombreusuario': new FormControl("", Validators.required),
      'contra': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

}
