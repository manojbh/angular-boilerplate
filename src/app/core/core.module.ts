import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard, AppGuard, throwIfAlreadyLoaded } from './guards';
import { HttpConfigInterceptor } from './interceptors';
import { ConfigProvider } from "./config.provider";
import { authStrategyProvider } from './services/auth/auth.strategy';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AppGuard,
    ConfigProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    authStrategyProvider,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
