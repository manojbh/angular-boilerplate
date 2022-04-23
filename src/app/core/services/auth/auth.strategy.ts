import { InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { config } from "@app/core/config";
import { SessionAuthStrategy } from "./session-auth.strategy";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { User } from "@app/core";
import { LocalStoreService  } from '@app/core/services/local-storage.service';
import { AuthStrategy } from "./auth.interface";



export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>(
  "AuthStrategy"
);

export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient, LocalStoreService],
  useFactory: (http: HttpClient, ls: LocalStoreService) => {
    switch (config.auth) {
      case "session":
        return new SessionAuthStrategy(http);
      case "token":
        return new JwtAuthStrategy(ls);
    }
  },
};
