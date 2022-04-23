import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "@app/core";
import { environment } from "@env/environment";
import { AuthStrategy } from "./auth.interface";

export class SessionAuthStrategy implements AuthStrategy<User> {
  private loggedUser: User | undefined;

  constructor(private http: HttpClient) { }

  doLoginUser(user: User): void {
    this.loggedUser = user;
  }

  doLogoutUser(): void {
    this.loggedUser = undefined;
  }

  getCurrentUser(): Observable<User> {
    if (this.loggedUser) {
      return of(this.loggedUser);
    } else {
      return this.http
        .get<User>(`${environment.apiURL}/profile/`)
        .pipe(tap((user) => (this.loggedUser = user)));
    }
  }
}
