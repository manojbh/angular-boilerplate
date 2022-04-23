import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../../core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { config } from '../config';
import { JwtAuthStrategy } from '../services/auth/jwt-auth.strategy';
import { AUTH_STRATEGY } from '../services/auth/auth.strategy';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    // private jwtAuth: AuthService,
    private transferState: TransferState,
    private cookieService: CookieService,
    @Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  private totalRequests = 0;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    var changedReq;
    if (config.auth === "token" && this.jwt && this.jwt.getToken()) {
      changedReq = this.addToken(request, this.jwt.getToken());
    } else {
      const token = this.cookieService.get('csrftoken');

      if (token) {
        changedReq = request.clone({ headers: request.headers.set('X-CSRFToken', token) });
      } else {
        changedReq = request;
      }

      changedReq = changedReq.clone({
        withCredentials: true
      });
    }




    // var token = this.jwtAuth.getJwtToken();

    // var changedReq;

    // if (token) {
    //   changedReq = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     },
    //   });
    // } else {
    //   changedReq = request;
    // }

    const key: StateKey<string> = makeStateKey<string>(request.url);
    if (isPlatformServer(this.platformId)) {
      return next.handle(changedReq).pipe(
        tap((event) => {
          this.transferState.set(key, (<HttpResponse<any>>event).body);
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
          }
        })
      )
    } else {
      const storedResponse = this.transferState.get<any>(key, null);
      if (storedResponse) {
        const response = new HttpResponse({ body: storedResponse, status: 200 });
        this.transferState.remove(key);
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
        return of(response);
      } else {
        return next.handle(changedReq).pipe(
          finalize(() => {
            this.totalRequests--;
            if (this.totalRequests === 0) {
              this.loadingService.setLoading(false);
            }
          })
        );
      }
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}
