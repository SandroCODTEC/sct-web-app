import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Congregacao, Evento } from '../models/congregacao';
import { AppInfoService } from '../shared/services';
import { DataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  constructor(
    private dataService: DataService,
    private appInfoService: AppInfoService,
    private sanitizer: DomSanitizer
  ) {}
  retore() {}
  bacup() {
    const congregacaoData: any = this.dataService.valueGet(
      'dx-data-localStore-Congregacao'
    );
    const saidasData: any = this.dataService.valueGet(
      'dx-data-localStore-Saidas'
    );
    const eventosData: any = this.dataService.valueGet(
      `dx-data-localStore-Eventos`
    );
    const passageirosData: any = this.dataService.valueGet(
      'dx-data-localStore-Passageiros'
    );
    const dependentesData: any = this.dataService.valueGet(
      'dx-data-localStore-Dependentes'
    );
    let passagensData: string[] = [];
    const eventosId = (<Evento[]>JSON.parse(eventosData)).map((m) => m.Oid);
    if (eventosId) {
      eventosId.forEach((e) => {
        const passagemDataTemp: any = this.dataService.valueGet(
          `dx-data-localStore-${e}`
        );
        if (passagemDataTemp) {
          passagensData.push(passagemDataTemp);
        }
      });
    }

    const exportFile: any = btoa(
      JSON.stringify({
        Version: this.appInfoService.currentVersion,
        Congregacao: congregacaoData,
        Saidas: saidasData,
        Eventos: eventosData,
        Passageiros: passageirosData,
        Dependentes: dependentesData,
        Passagens: passagensData,
      })
    );

    this.downloadfile('backup.sct', exportFile);
  }
  fileUrl: any;
  downloadfile(filename: string, content: string) {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    let url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    // window.open(url);

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   window.URL.createObjectURL(blob)
    // );
  }
}
