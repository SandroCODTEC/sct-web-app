import { Component, OnInit, NgModule, Input, ViewChild } from '@angular/core';
import {
  SideNavigationMenuModule,
  HeaderModule,
} from '../../shared/components';
import { ScreenService } from '../../shared/services';
import { ItemClickEvent as TreeViewItemClickEvent } from 'devextreme/ui/tree_view';
import { ItemClickEvent as ToolbarItemClickEvent } from 'devextreme/ui/toolbar';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import {
  DxScrollViewModule,
  DxScrollViewComponent,
} from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { UpdateService } from 'src/app/shared/services/update.service';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-side-nav-inner-toolbar',
  templateUrl: './side-nav-inner-toolbar.component.html',
  styleUrls: ['./side-nav-inner-toolbar.component.scss'],
})
export class SideNavInnerToolbarComponent implements OnInit {
  @ViewChild(DxScrollViewComponent, { static: true })
  scrollView!: DxScrollViewComponent;
  selectedRoute = '';

  menuOpened!: boolean;
  temporaryMenuOpened = false;

  @Input()
  title!: string;

  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;

  constructor(
    private screen: ScreenService,
    private router: Router,
    private updates: SwUpdate
  ) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(
        () => {
        console.log('checking for updates');
        if (this.updateAvailable) this.checkForUpdates();
        }
      );
    }
  }

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      }
    });

    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  toggleMenu = (e: ToolbarItemClickEvent) => {
    this.menuOpened = !this.menuOpened;
    e.event?.stopPropagation();
  };

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  navigationChanged(event: TreeViewItemClickEvent) {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]);
        this.scrollView.instance.scrollTo(0);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }

  public updateAvailable: boolean = false;

  public checkForUpdates(): void {
    this.updates.checkForUpdate().then((event) => {
      console.log('updating available');
      this.updateAvailable = event;
    });
  }

  updateNow(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => {
      notify('Sistema atualizado com sucesso!', 'success', 10000);
      window.location.reload();
    });
  }
}

@NgModule({
  imports: [
    SideNavigationMenuModule,
    DxDrawerModule,
    HeaderModule,
    DxToolbarModule,
    DxScrollViewModule,
    CommonModule,
    DxButtonModule,
  ],
  exports: [SideNavInnerToolbarComponent],
  declarations: [SideNavInnerToolbarComponent],
})
export class SideNavInnerToolbarModule {}
