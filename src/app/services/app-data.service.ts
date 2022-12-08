import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import notify from 'devextreme/ui/notify';
import {
  Backup,
  BackupPassagem,
  Congregacao,
  Evento,
} from '../models/congregacao';
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
  fileHandle: any;
  restore(content: any) {
    const backupData: Backup = JSON.parse(atob(content));
    this.dataService.valueSet(
      'dx-data-localStore-Congregacao',
      backupData.Congregacao
    );
    this.dataService.valueSet('dx-data-localStore-Saidas', backupData.Saidas);
    this.dataService.valueSet('dx-data-localStore-Eventos', backupData.Eventos);
    this.dataService.valueSet(
      'dx-data-localStore-Passageiros',
      backupData.Passageiros
    );
    this.dataService.valueSet(
      'dx-data-localStore-Dependentes',
      backupData.Dependentes
    );
    if (backupData.Passagens) {
      backupData.Passagens.forEach((bp) => {
        this.dataService.valueSet(`dx-data-localStore-${bp.Oid}`, bp.Passagens);
      });
    }
    notify('Backup restaurado com sucesso!', 'success', 10000);
  }
  backup() {
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
    let passagensData: BackupPassagem[] = [];
    if (eventosData) {
      const eventosId = (<Evento[]>JSON.parse(eventosData)).map((m) => m.Oid);
      if (eventosId) {
        eventosId.forEach((e) => {
          const passagemDataTemp: any = this.dataService.valueGet(
            `dx-data-localStore-${e}`
          );
          if (passagemDataTemp) {
            passagensData.push(<BackupPassagem>{
              Oid: e,
              Passagens: passagemDataTemp,
            });
          }
        });
      }
    }
    const exportFile: any = btoa(
      JSON.stringify({
        Type: 'bkp',
        Version: this.appInfoService.currentVersion,
        Congregacao: congregacaoData,
        Saidas: saidasData,
        Eventos: eventosData,
        Passageiros: passageirosData,
        Dependentes: dependentesData,
        Passagens: passagensData,
      })
    );
    const d = new Date();
    this.downloadfile(
      `backup${d.getFullYear()}${this.pad(d.getMonth() + 1)}${this.pad(
        d.getDate()
      )}${this.pad(d.getHours())}${this.pad(d.getMinutes())}${this.pad(
        d.getSeconds()
      )}.txt`,
      exportFile
    );

    notify('Backup realizado com sucesso!', 'success', 10000);
  }
  export(eventoId: string) {
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
    let passagens: any[] = [];
    let evento: Evento | undefined;
    if (eventosData) {
      evento = (<Evento[]>JSON.parse(eventosData)).find(
        (f) => f.Oid == eventoId
      );
      const passagemDataTemp: any = this.dataService.valueGet(
        `dx-data-localStore-${evento?.Oid}`
      );
      if (passagemDataTemp) {
        passagens = JSON.parse(passagemDataTemp);
      }
    }
    const exportFile: any = btoa(
      JSON.stringify({
        Type: 'sct',
        Version: this.appInfoService.currentVersion,
        Congregacao: congregacaoData ? JSON.parse(congregacaoData)[0] : {},
        Saidas: saidasData ? JSON.parse(saidasData) : [],
        Evento: eventosData ? JSON.parse(eventosData) : {},
        Passageiros: passageirosData ? JSON.parse(passageirosData) : [],
        Dependentes: dependentesData ? JSON.parse(dependentesData) : [],
        Passagens: passagens,
      })
    );
    const d = new Date();
    this.downloadfile(
      `sct${d.getFullYear()}${this.pad(d.getMonth() + 1)}${this.pad(
        d.getDate()
      )}${this.pad(d.getHours())}${this.pad(d.getMinutes())}${this.pad(
        d.getSeconds()
      )}.txt`,
      exportFile
    );

    notify(
      'Preparamos os dados do arranjo. Agora é só enviar para o responsável pelo seu SCT.',
      'success',
      10000
    );
  }
  fileUrl: any;
  downloadfile(filename: string, content: string) {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    let url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    // window.open(url);

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   window.URL.createObjectURL(blob)
    // );
  }
  private pad(d: number) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }
}
