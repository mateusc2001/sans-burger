import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public readonly loginCredentials = {
    email: 'burger@gmail.com',
    pass: 1234
  }

  formControlLogin = new FormGroup({
    email: new FormControl('burger@gmail.com', [Validators.required, Validators.email]),
    senha: new FormControl('1234', [Validators.required])
  });

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public emailHasError(value: string): any {
    return this.formControlLogin.controls.email.hasError(value);
  }

  public logar(): void {
    const email = (this.formControlLogin.controls.email.value);
    const senha = (this.formControlLogin.controls.senha.value);
    if (email == this.loginCredentials.email && senha == this.loginCredentials.pass) {
      this.router.navigateByUrl('/admin');
    }
  }

}
