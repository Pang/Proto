import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container d-flex text-center justify-content-center">
      <div class="card mt-5" style="width: 20vw">
        <h5 class="card-title text-center mt-4">Login</h5>
        <form class="p-5" [formGroup]="loginForm" (ngSubmit)="loginUser()">
          <input class="form-control mb-2" type="email" formControlName="username" placeholder="email" required>
          <input class="form-control mb-2" type="password" formControlName="password" placeholder="password" required>
          <button class="btn btn-primary" type="submit" [disabled]="loginForm.invalid">Submit</button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.loginService.createForm();
  }

  loginUser() {
    this.loginService.post();
  }
}
