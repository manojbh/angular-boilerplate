import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { AUTH_STRATEGY } from "./auth.strategy";
import { User } from "@models/user.model";
import { environment } from "@env/environment";
import { AuthStrategy } from "./jwt-auth.strategy";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  return: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) {

    this.route.queryParams
      .subscribe((params) => {
        this.return = params['return'] || '/';
      });
  }


  login(username: string, password: string): Observable<User> {
    return this.http
      .post<any>(`${environment.apiURL}/login/`, {username, password})
      .pipe(tap((data) => this.auth.doLoginUser(data)));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User | undefined> {
    return this.auth.getCurrentUser();
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(["/login"]);
  }

  private doLogoutUser() {
    this.auth.doLogoutUser();
  }
}
