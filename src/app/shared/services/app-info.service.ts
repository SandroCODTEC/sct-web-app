import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return `SCT - ${this.currentVersion}`;
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
  public get currentVersion() {
    return "1.0.4";
  }
}
