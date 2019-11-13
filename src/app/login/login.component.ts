import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  loginForm: FormGroup;
  registrationFailed: boolean;

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = fb.control('', Validators.required);
    this.passwordCtrl = fb.control('', Validators.required);
    this.loginForm = fb.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });
  }

  ngOnInit() {}
  login() {
    const credentials = { login: this.loginForm.value.login, password: this.loginForm.value.password };
    this.userService.authenticate(credentials).subscribe(() => this.router.navigate(['/']), () => (this.registrationFailed = true));
  }
}
