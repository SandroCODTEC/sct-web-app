import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { DataService } from 'src/app/services/local-data.service';
import { confirm } from 'devextreme/ui/dialog';
import {
  Evento,
  Passageiro,
  Passagem,
  Saida,
} from 'src/app/models/congregacao';

@Component({
  selector: 'app-passagem',
  templateUrl: './passagem.component.html',
  styleUrls: ['./passagem.component.scss'],
})
export class PassagemComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid:
    | DxDataGridComponent
    | undefined;
  dataSource: any;
  passagem: any;
  dependentes: any;
  // dependenteColumns: any;
  passageiros: any;
  dias: any;
  saidas: any;
  primeiraSaida: string;
  eventos: any;
  currentEvento: string | null;
  grupos: any;

  constructor(public dataService: DataService) {
    this.currentEvento = dataService.valueGet('currentEvento');
    const saidasList = <Saida[]>(
      JSON.parse(dataService.valueGet('dx-data-localStore-Saidas'))
    );
    if (saidasList.length > 0) this.primeiraSaida = saidasList[0].Oid;
    else this.primeiraSaida = '';
    this.setFiltredPassagens();
    this.setFiltredDias();
    this.passageiros = dataService.getLocalLookUpDataSource('Passageiros');
    // this.dependenteColumns =
    //   dataService.getLocalLookUpDataSource('Dependentes');
    this.saidas = dataService.getLocalLookUpDataSource('Saidas');
    this.eventos = dataService.getLocalLookUpDataSource('Eventos');
    this.grupos = this.getGrupos();

    this.setPassageiroValue = this.setPassageiroValue.bind(this);
  }

  ngOnInit(): void {}

  setPassageiroValue(rowData: any, value: any): void {
    let rowIndex = this.dataGrid?.instance.getRowIndexByKey(this.passagem.Oid);
    rowIndex = rowIndex ? rowIndex : 0;
    this.dataGrid?.instance.cellValue(rowIndex, 'Dependentes', []);
    rowData.Dependentes = [];
    this.passagem.Passageiro = rowData.Passageiro = { Oid: value };
    this.getFiltredDepedentes();
  }
  getFiltredDepedentes() {
    return {
      store: this.dataService.getLocalDataStore('Dependentes'),
      filter: this.passagem?.Passageiro?.Oid
        ? ['Passageiro.Oid', '=', this.passagem?.Passageiro?.Oid]
        : [],
    };
  }
  onEditorPreparation(event: any) {
    if (event.parentType === 'dataRow' && event.dataField === 'Dependentes') {
      event.editorName = 'dxTagBox';
      event.editorOptions.displayExpr = 'Nome';
      event.editorOptions.valueExpr = 'Oid';
      event.editorOptions.disabled = !event.row.data?.Passageiro?.Oid;
      event.editorOptions.dataSource = this.getFiltredDepedentes();
    }
    if (event.parentType === 'dataRow' && event.dataField === 'Dias') {
      event.editorName = 'dxTagBox';
      event.editorOptions.displayExpr = 'Text';
      event.editorOptions.valueExpr = 'Value';
      event.editorOptions.disabled = !this.currentEvento;
      this.setFiltredDias();
      event.editorOptions.dataSource = this.dias;
    }
  }
  onRoleValueChanged(event: any, cell: any) {
    console.log('onRoleValueChanged', event);
    cell.setValue(event.value);
  }
  eventoChanged(e: any) {
    this.dataService.valueSet('currentEvento', e.value);
    this.currentEvento = e.value;
    this.setFiltredPassagens();
    this.setFiltredDias();
    const passagemData = this.dataService.valueGet(
      `dx-data-localStore-${this.currentEvento}`
    );
    const totalPassagens = passagemData ? JSON.parse(passagemData).length : -1;
    if (totalPassagens == -1) {
      confirm(
        'Notamos que não há passagens para este evento. Podemos importar todos os passageiro e preparar a lista para você. Depois você só ajusta.',
        'Deseja importar os passageiros?'
      ).then((dialogResult) => {
        if (dialogResult) {
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
                Dias: this.dias.map((d: any) => d.Value),
                Grupo: {
                  Oid: 0,
                },
                Saida: {
                  Oid: this.primeiraSaida,
                },
              }
          );
          const store = this.dataService.getLocalDataStore(
            this.currentEvento ? this.currentEvento : ''
          );
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
      });
    }
  }
  setFiltredPassagens() {
    this.dataSource = null;
    this.dataSource = this.dataService.getLocalDataSource(
      this.currentEvento ? this.currentEvento : ''
    );
  }

  setFiltredDias() {
    this.dias = null;
    const eventosData = this.dataService.valueGet(`dx-data-localStore-Eventos`);
    const e = eventosData
      ? (<Evento[]>JSON.parse(eventosData)).find(
          (f) => f.Oid === this.currentEvento
        )
      : <Evento>{ DataInicial: new Date() };
    this.dias = this.daysBetween(
      new Date(e?.DataInicial ? e?.DataInicial : new Date()),
      new Date(e?.DataFinal ? e?.DataFinal : new Date())
    );
  }
  daysBetween(d1: Date, d2: Date) {
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
          weekday: 'short',
        })}`,
      });
    }
    return days;
  }
  pad(d: number) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }
  initNewRow(e: any) {
    this.passagem = e.data;
    e.data.Evento = { Oid: this.currentEvento };
    e.data.Dias = this.dias.map((m: any) => m.Value);
    e.data.Ativo = true;
    e.data.Grupo = { Oid: 0 };
    e.data.Dependentes = [];
    this.dependentes = null;
  }
  editingStart(e: any) {
    this.passagem = e.data;
    this.getFiltredDepedentes();
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
}
