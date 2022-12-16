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
import { PassagemService } from 'src/app/services/passagem.service';
import { AppDataService } from 'src/app/services/app-data.service';
import { InputKeyComponent } from 'src/app/shared/components/input-key/input-key.component';

@Component({
  selector: 'app-passagem',
  templateUrl: './passagem.component.html',
  styleUrls: ['./passagem.component.scss'],
})
export class PassagemComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid:
    | DxDataGridComponent
    | undefined;
    @ViewChild(InputKeyComponent, { static: false }) input:
    | InputKeyComponent
    | undefined;
  dataSource: any;
  passagem: any;
  dependentes: any;
  passageiros: any;
  dias: any;
  saidas: any;
  eventos: any;

  constructor(
    public dataService: DataService,
    public passagemService: PassagemService,
    private appDataService: AppDataService
  ) {
    this.dataSource = this.passagemService.getFiltredPassagens();
    this.dias = this.passagemService.getFiltredDias();
    this.passageiros = dataService.getLocalLookUpDataSource('Passageiros');
    this.saidas = dataService.getLocalLookUpDataSource('Saidas');
    this.eventos = dataService.getLocalLookUpDataSource('Eventos');

    this.importarPassageiros = this.importarPassageiros.bind(this);
    this.setPassageiroValue = this.setPassageiroValue.bind(this);
    this.eventoChanged = this.eventoChanged.bind(this);
  }

  ngOnInit(): void {}

  setPassageiroValue(rowData: any, value: any): void {
    let rowIndex = this.dataGrid?.instance.getRowIndexByKey(this.passagem.Oid);
    rowIndex = rowIndex ? rowIndex : 0;
    this.dataGrid?.instance.cellValue(rowIndex, 'Dependentes', []);
    rowData.Dependentes = [];
    this.passagem.Passageiro = rowData.Passageiro = { Oid: value };
    this.passagemService.getFiltredDepedentes(this.passagem);
  }

  onEditorPreparation(event: any) {
    if (event.parentType === 'dataRow' && event.dataField === 'Dependentes') {
      event.editorName = 'dxTagBox';
      event.editorOptions.displayExpr = 'Nome';
      event.editorOptions.valueExpr = 'Oid';
      event.editorOptions.disabled = !event.row.data?.Passageiro?.Oid;
      event.editorOptions.dataSource =
        this.passagemService.getFiltredDepedentes(this.passagem);
    }
    if (event.parentType === 'dataRow' && event.dataField === 'Dias') {
      event.editorName = 'dxTagBox';
      event.editorOptions.displayExpr = 'Text';
      event.editorOptions.valueExpr = 'Value';
      event.editorOptions.disabled = !this.passagemService.currentEvento;
      this.dias = this.passagemService.getFiltredDias();
      event.editorOptions.dataSource = this.dias;
    }
  }
  onRoleValueChanged(event: any, cell: any) {
    cell.setValue(event.value);
  }
  eventoChanged(e: any) {
    this.dataService.valueSet('currentEvento', e.value);
    this.passagemService.currentEvento = e.value;
    this.dataSource = this.passagemService.getFiltredPassagens();
    this.dias = this.passagemService.getFiltredDias();
  }
  importarPassageiros(e: any) {
    if (this.passagemService.getTotalPassagens(e.value) === -1) {
      confirm(
        'Podemos importar todos os passageiro e preparar a lista para você.<br>Depois você só ajusta.',
        'Deseja importar os passageiros?'
      ).then((dialogResult) => {
        if (dialogResult) {
          this.passagemService
            .insertBulkPassageiros()
            .then(
              (_) =>
                (this.dataSource = this.passagemService.getFiltredPassagens())
            );
        }
      });
    }
  }

  initNewRow(e: any) {
    this.passagem = e.data;
    e.data.Evento = { Oid: this.passagemService.currentEvento };
    e.data.Dias = this.dias.map((m: any) => m.Value);
    e.data.Ativo = true;
    e.data.Grupo = { Oid: 0 };
    e.data.Dependentes = [];
    this.dependentes = null;
  }
  editingStart(e: any) {
    this.passagem = e.data;
    this.dependentes = this.passagemService.getFiltredDepedentes(this.passagem);
  }
  export = () => {
    this.input?.showDialog();
  };

  saved(value: any) {
    console.log(value);
    this.appDataService.export(value.Chave, this.passagemService.currentEvento);
  }
}
