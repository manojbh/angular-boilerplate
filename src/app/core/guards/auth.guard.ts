import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    // return of(true);
    return this.authService.isLoggedIn$().pipe(
      tap({
        next: (isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate([this.authService.return]);
          }
        },
        complete: ()=> {
          return of(false);
        }
      }),
      map(isLoggedIn => !isLoggedIn)
    );
  }

}

