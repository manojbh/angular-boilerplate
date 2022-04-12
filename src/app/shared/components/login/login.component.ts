import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
  popup: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  error!: string;
  isLoading: boolean = false;
  loginForm!: FormGroup;
  show_password = false;

  @ViewChild(MatProgressBar) progressBar!: MatProgressBar;
  @ViewChild(MatButton) submitButton!: MatButton;


 isLoggedIn = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  get f () {
    return this.loginForm.controls;
  }

  ngAfterViewInit() {
    // this.autoSignIn();
  }

  login() {
    this.isLoading = true;
    const signinData = this.loginForm.value

  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  autoSignIn() {
    // if(this.authService.return === '/') {
    //   return
    // }
    // // this.loader.open(`Automatically Signing you in!`, {width: '320px'});
    // setTimeout(() => {
    //   this.login();
    //   // this.loader.close()
    // }, 2000);
  }

  navigateToRegister(e) {
    e.preventDefault();
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/auth/register'])
    );
    window.open(url, '_blank');
  }
  close() {
    this.dialogRef.close(false);
  }

  passwordVisibility() {
    this.show_password = !this.show_password;

  }

}
