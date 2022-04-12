import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStoreService } from './local-storage.service';

export interface ThemeObject {
  oldValue: string | null;
  newValue: string;
};


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  initialSetting: ThemeObject = {
    oldValue: null,
    newValue: 'light'
  };


  themeSelection: BehaviorSubject<ThemeObject> = new BehaviorSubject<ThemeObject>(this.initialSetting);


  constructor(
    private ls: LocalStoreService
  ) {

  }

  setTheme(theme: string) {
    this.themeSelection.next(
      {
        oldValue: this.themeSelection.value.newValue,
        newValue: theme
      });
  }

  themeChanges(): Observable<ThemeObject> {
    return this.themeSelection.asObservable();
  }
}
