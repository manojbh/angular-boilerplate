import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchOnArrayOfObject } from './searcharray.pipe';
import { SafeHtmlPipe } from "./safehtml.pipe";
import { GetAfterLastChar } from "./get_after_last_slash.pipe";
@NgModule({
  declarations: [SafeHtmlPipe, SearchOnArrayOfObject, GetAfterLastChar],
  imports: [CommonModule],
  exports: [SafeHtmlPipe, SearchOnArrayOfObject, GetAfterLastChar]
})
export class MainPipe { }
