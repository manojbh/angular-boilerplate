import { Observable, of } from "rxjs";
import { Token } from "@models/token";
import { User } from "@models/user.model";
import { LocalStoreService } from "@app/core/services/local-storage.service";

export interface AuthStrategy<T> {
  doLoginUser(data: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<User | undefined>;
}

export class JwtAuthStrategy implements AuthStrategy<Token> {
  private readonly JWT_TOKEN = "JWT_TOKEN";

  constructor(
    private ls: LocalStoreService,
  ) {}

  doLoginUser(token: Token): void {
    this.ls.setItem(this.JWT_TOKEN, token.jwt);
  }

  doLogoutUser(): void {
    this.ls.removeItem(this.JWT_TOKEN);
  }

  getCurrentUser(): Observable<User | undefined> {
    const token = this.getToken();
    console.log(token);
    if (token) {
      const encodedPayload = token.split(".")[1];
      const payload = window.atob(encodedPayload);
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }

  getToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
}
