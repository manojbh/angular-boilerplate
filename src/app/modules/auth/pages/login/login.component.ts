import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';
  isLoading: boolean = false;
  loginForm!: FormGroup;
  show_password = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.buildForm();
  }

  ngOnInit() { }

  get f() {
    return this.loginForm.controls;
  }

  ngAfterViewInit() {
    // this.autoSignIn();
  }

  login() {
    this.isLoading = true;
    const signinData = this.loginForm.value

    this.authService.login(signinData.username, signinData.password)
      .subscribe({
        next: (res) => {
          if (this.authService.return && this.authService.return != '/') {
            this.router.navigateByUrl(this.authService.return);
            // this.document.location.href = `${this.authService.return}`;
          } else {
            this.router.navigateByUrl('/');
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      });
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  autoSignIn() {
    if (this.authService.return === '/') {
      return
    }
    // this.loader.open(`Automatically Signing you in!`, {width: '320px'});
    setTimeout(() => {
      this.login();
      // this.loader.close()
    }, 2000);
  }

  passwordVisibility() {
    this.show_password = !this.show_password;
  }
}
