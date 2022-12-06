import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { IUser } from '../../services/auth.service';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: IUser | null;

  eventos: any;
  constructor(private dataService: DataService) {
  }
}

@NgModule({
  imports: [DxListModule, DxContextMenuModule, DxSelectBoxModule, CommonModule],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule {}
