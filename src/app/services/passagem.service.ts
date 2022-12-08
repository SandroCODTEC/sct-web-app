import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { Evento, Passageiro, Passagem, Saida } from '../models/congregacao';
import { DataService } from './local-data.service';

@Injectable({
  providedIn: 'root',
})
export class PassagemService {
  public currentEvento: string;
  public primeiraSaida: string;
  public grupos: any;

  constructor(private dataService: DataService) {
    this.currentEvento = this.getEventoOid();
    this.primeiraSaida = this.getPrimeiraSaida();
    this.grupos = this.getGrupos();
  }
  private getPrimeiraSaida(): string {
    const saidasList = <Saida[]>(
      JSON.parse(this.dataService.valueGet('dx-data-localStore-Saidas'))
    );
    if (saidasList?.length > 0) return saidasList[0].Oid;
    else return '';
  }
  private getEventoOid(): string {
    const oid = this.dataService.valueGet('currentEvento');
    if (!this.currentEvento) {
      const list = <Saida[]>(
        JSON.parse(this.dataService.valueGet('dx-data-localStore-Eventos'))
      );
      if (list?.length > 0) {
        this.dataService.valueSet('currentEvento', list[0].Oid);
        return list[0].Oid;
      } else return '';
    } else return oid;
  }
  getFiltredDepedentes(passagem: Passagem) {
    return {
      store: this.dataService.getLocalDataStore('Dependentes'),
      filter: passagem?.Passageiro?.Oid
        ? ['Passageiro.Oid', '=', passagem?.Passageiro?.Oid]
        : [],
    };
  }
  getTotalPassagens(evento: string): number {
    const passagemData = this.dataService.valueGet(
      `dx-data-localStore-${evento}`
    );
    return passagemData ? JSON.parse(passagemData)?.length : -1;
  }
  getNovosPassageiros(): Passagem[] {
    const passageirosData = this.dataService.valueGet(
      `dx-data-localStore-Passageiros`
    );
    const passageirosList = passageirosData
      ? <Passageiro[]>JSON.parse(passageirosData)
      : <Passageiro[]>[];

    const dependentesData = this.dataService.valueGet(
      `dx-data-localStore-Dependentes`
    );
    const dependentesList = dependentesData
      ? <any[]>JSON.parse(dependentesData)
      : <any[]>[];

    const ps = passageirosList.map(
      (m) =>
        <Passagem>{
          Evento: {
            Oid: this.currentEvento,
          },
          Passageiro: {
            Oid: m.Oid,
          },
          Dependentes: dependentesList
            .filter((f) => f.Passageiro?.Oid === m.Oid)
            .map((d: any) => d.Oid),
          Dias: this.getFiltredDias().map((d: any) => d.Value),
          Grupo: {
            Oid: 0,
          },
          Saida: {
            Oid: this.primeiraSaida,
          },
        }
    );
    return ps;
  }
  getFiltredPassagens(): DataSource {
    return this.dataService.getLocalDataSource(
      this.currentEvento ? this.currentEvento : ''
    );
  }
  getFiltredDias(): any[] {
    const eventosData = this.dataService.valueGet(`dx-data-localStore-Eventos`);
    const e = eventosData
      ? (<Evento[]>JSON.parse(eventosData)).find(
          (f) => f.Oid === this.currentEvento
        )
      : <Evento>{ DataInicial: new Date() };
    return this.daysBetween(
      new Date(e?.DataInicial ? e?.DataInicial : new Date()),
      new Date(e?.DataFinal ? e?.DataFinal : new Date())
    );
  }
  private daysBetween(d1: Date, d2: Date) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    let days = [];
    for (let i = 0; i < diffDays; i++) {
      let dayRef = new Date(d1);
      const date = new Date(dayRef.setDate(dayRef.getDate() + i));
      days.push({
        Value: `${date.getFullYear()}${date.getMonth()}${this.pad(
          date.getDate()
        )}`,
        Text: `${date.getDate()} - ${date.toLocaleString('pt-BR', {
          weekday: 'long',
        })}`,
      });
    }
    return days;
  }
  private pad(d: number) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }
  getGrupos() {
    var grupos = [
      { Value: 0, Text: 'NENHUM' },
      { Value: 1, Text: 'GRUPO 1' },
      { Value: 2, Text: 'GRUPO 2' },
      { Value: 3, Text: 'GRUPO 3' },
      { Value: 4, Text: 'GRUPO 4' },
      { Value: 5, Text: 'GRUPO 5' },
      { Value: 6, Text: 'GRUPO 6' },
      { Value: 7, Text: 'GRUPO 7' },
      { Value: 8, Text: 'GRUPO 8' },
      { Value: 9, Text: 'GRUPO 9' },
      { Value: 10, Text: 'GRUPO 10' },
      { Value: 11, Text: 'GRUPO 11' },
      { Value: 12, Text: 'GRUPO 12' },
      { Value: 13, Text: 'GRUPO 13' },
      { Value: 14, Text: 'GRUPO 14' },
      { Value: 15, Text: 'GRUPO 15' },
      { Value: 16, Text: 'GRUPO 16' },
      { Value: 17, Text: 'GRUPO 17' },
      { Value: 18, Text: 'GRUPO 18' },
      { Value: 19, Text: 'GRUPO 19' },
      { Value: 20, Text: 'GRUPO 20' },
      { Value: 21, Text: 'GRUPO 21' },
      { Value: 22, Text: 'GRUPO 22' },
      { Value: 23, Text: 'GRUPO 23' },
      { Value: 24, Text: 'GRUPO 24' },
      { Value: 25, Text: 'GRUPO 25' },
      { Value: 26, Text: 'GRUPO 26' },
      { Value: 27, Text: 'GRUPO 27' },
      { Value: 28, Text: 'GRUPO 28' },
      { Value: 29, Text: 'GRUPO 29' },
      { Value: 30, Text: 'GRUPO 30' },
    ];
    return grupos;
  }

  insertBulkPassageiros() {
    const store = this.dataService.getLocalDataStore(
      this.currentEvento ? this.currentEvento : ''
    );
    const ps = this.getNovosPassageiros();
    ps.forEach((p) => {
      store
        .insert(p)
        .then((values) => {
          console.log(values);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    store.load().then((data) => {
      notify('Passagens importadas com sucesso!', 'success');
      window.location.reload();
    });
  }
}
