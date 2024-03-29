import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { loadMessages, locale } from 'devextreme/localization';
import ptMessages from 'pt.json';
import { DataService } from './services/local-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes)
      .filter((cl) => this.screen.sizes[cl])
      .join(' ');
  }

  constructor(
    private authService: AuthService,
    private screen: ScreenService,
    public dataService: DataService,
    public appInfo: AppInfoService
  ) {
    loadMessages(ptMessages);
    locale(navigator.language);

    this.dataService.resetValues();
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
