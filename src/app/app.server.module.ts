import { Inject, NgModule } from '@angular/core';
import { INITIAL_CONFIG, PlatformConfig, ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { translateServerLoaderFactory } from './shared/translate-server.loader';
import { TransferState } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(@Inject(INITIAL_CONFIG) private config: PlatformConfig) {
    this.config.useAbsoluteUrl = true;
  }

}
