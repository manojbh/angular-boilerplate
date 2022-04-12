import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStoreService, ThemeService } from '../../core';
// import { LocalStoreService } from '@app/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  theme: string = 'light';

  constructor(
    public translate: TranslateService,
    private ls: LocalStoreService,
    private themeService: ThemeService
  ) {

    translate.addLangs(['en', 'np']);
    if (this.ls.getItem('language')) {
      translate.setDefaultLang(this.ls.getItem('language'));
      translate.use(this.ls.getItem('language'));
    } else {
      translate.setDefaultLang('en');
      translate.use('en');
    }

  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.ls.setItem("language", lang);
  }

  changeTheme() {
    if (this.theme === 'light') {
      this.theme = 'darkMode';
    } else {
      this.theme = 'light';
    }

    this.themeService.setTheme(this.theme)
    this.ls.setItem("theme", this.theme);

  }

}
