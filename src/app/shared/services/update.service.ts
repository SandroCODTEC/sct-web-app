import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable()
export class UpdateService {
  public updateAvailable: boolean = false;
  constructor(public updates: SwUpdate) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() =>
        updates.checkForUpdate().then(() => console.log('checking for updates'))
      );
    }
  }

  public checkForUpdates(): void {
    this.updates.checkForUpdate().then((event) => {
      //this.updateNow();
      this.updateAvailable = event;
    });
  }

  private updateNow(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
