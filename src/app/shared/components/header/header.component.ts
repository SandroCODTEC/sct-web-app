import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import {
  DxFileUploaderComponent,
  DxFileUploaderModule,
  DxPopupModule,
} from 'devextreme-angular';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: IUser | null = { email: '' };

  userMenuItems = [
    {
      text: 'Profile',
      icon: 'user',
      onClick: () => {
        this.router.navigate(['/profile']);
      },
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: () => {
        this.authService.logOut();
      },
    },
  ];

  filevalue: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private appDataService: AppDataService
  ) {
    // this.targetElement = document.querySelector('#targetRestore') as Element;
  }

  ngOnInit() {
    this.authService.getUser().then((e) => (this.user = e.data));
  }
  ngAfterViewInit() {}
  toggleMenu = () => {
    this.menuToggle.emit();
  };
  backup = () => {
    this.appDataService.backup();
  };
  openFileDialog = false;
  openDialog = () => (this.openFileDialog = true);
  restore = async (e: any) => {
    const text = await e[0].text();
    // console.log(text);
    this.openFileDialog = false;
    this.appDataService.restore(text);
  };

}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxPopupModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
