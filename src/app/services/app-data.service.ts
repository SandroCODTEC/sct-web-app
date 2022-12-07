import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import notify from 'devextreme/ui/notify';
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
  fileHandle: any;
  restore(content: any) {
    //   var input = document.createElement('input');
    //   input.type = 'file';
    //   input.onchange = (e) => {
    //     const files = e.target.files ? 1 : 2;
    //     // promise.resolve(files);
    // }
    // input.onchange = () => {
    //   const file = input.files[0];
    //   if (file) {
    //     file?.arrayBuffer().then((arrayBuffer) => {
    //       const content = new TextDecoder().decode(arrayBuffer);
    //       console.log(content);
    //       console.log(btoa(content));
    //     });
    //   }
    // };
    // input.click();
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
    let passagensData: string[] = [];
    if (eventosData) {
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
    const d = new Date();
    this.downloadfile(
      `backup${d.getFullYear()}${this.pad(d.getMonth() + 1)}${this.pad(
        d.getDate()
      )}${this.pad(d.getHours())}${this.pad(d.getMinutes())}${this.pad(
        d.getSeconds()
      )}.sct`,
      exportFile
    );

    notify('Backup realizado com sucesso!', 'success', 10000);
  }
  export() {}
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
