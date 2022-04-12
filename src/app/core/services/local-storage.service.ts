import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length!: number;
  clear(): void { }
  getItem(key: string): string | null { return null; }
  key(index: number): string | null { return null; }
  removeItem(key: string): void { }
  setItem(key: string, value: string): void { }
}


@Injectable({
  providedIn: 'root',
})
export class LocalStoreService implements Storage {

  private ls: any;
  private storage: Storage;

  constructor() {
    this.storage = new LocalStorage();
    AppComponent.isBrowser.subscribe(isBrowser => {
      if (isBrowser) {
        this.storage = localStorage;
      }
    });
  }
  [name: string]: any;
  length!: number;
  public setItem(key:string, value:any) {
    value = JSON.stringify(value);
    this.storage.setItem(key, value);
    return true;
  }

  public getItem(key: string) {
    const value = this.storage.getItem(key);
    try {
      return JSON.parse(value!);
    } catch (e) {
      return null;
    }
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}
