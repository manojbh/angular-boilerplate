import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { AppLoaderComponent } from "./components/app-loader/app-loader.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainPipe } from './pipes/pipes.module';
import { AppLoaderService } from './components/app-loader/app-loader.service';
import { AppComfirmComponent } from './components/app-confirm/app-confirm.component';
import { AppConfirmService } from './components/app-confirm/app-confirm.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MainPipe
  ],
  declarations: [ControlMessagesComponent, AppLoaderComponent, AppComfirmComponent],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ControlMessagesComponent,
    MatProgressSpinnerModule,
    AppLoaderComponent,
    AppComfirmComponent,
  ],
  providers: [
    AppLoaderService,
    AppConfirmService
  ]
})
export class SharedModule { }
