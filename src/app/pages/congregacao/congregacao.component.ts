import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Congregacao, Saida } from 'src/app/models/congregacao';
import { DataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-congregacao',
  templateUrl: './congregacao.component.html',
  styleUrls: ['./congregacao.component.scss'],
})
export class CongregacaoComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid:
    | DxDataGridComponent
    | undefined;
  @ViewChild(DxFormComponent, { static: false }) form:
    | DxFormComponent
    | undefined;

  congregacao: Congregacao | undefined = undefined;
  saidas: any;
  saida: any;
  phonePattern: any = /^[02-9]\d{9}$/;
  mapOptions: any = { lat: -14.783911, lng: -39.046779 };
  markers: any = [
    {
      location: 'Brazil',
    },
  ];
  saidaMarker: any[] | undefined = [];
  routes: any[] = [];
  zoom = 6;
  showMapSaida = false;
  setLocalButtonOptions: any;
  closeButtonOptions: any;

  phoneRules: any = {
    X: /[02-9]/,
  };

  buttonOptions: any = {
    text: 'Salvar',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor(dataService: DataService) {
    const that = this;

    dataService
      .getLocalDataStore('Congregacao')
      .load()
      .then((data) => {
        if (data) {
          console.log(data);
          this.congregacao = data[0];
        }
      });
    this.saidas = dataService.getLocalDataSource('Saidas');
    this.realodSaida();
    this.setLocalButtonOptions = {
      icon: 'check',
      text: 'Confirmar Local',
      onClick(e: any) {
        let rowIndex = that.dataGrid?.instance.getRowIndexByKey(that.saida.Oid);
        rowIndex = rowIndex ? rowIndex : 0;
        that.dataGrid?.instance.cellValue(
          rowIndex,
          'Latitude',
          that.saida.Latitude
        );
        that.dataGrid?.instance.cellValue(
          rowIndex,
          'Longitude',
          that.saida.Longitude
        );
        const message = `Local selecionado com sucesso!`;
        notify(
          {
            message,
          },
          'success',
          3000
        );
        that.showMapSaida = false;
      },
    };
    this.closeButtonOptions = {
      text: 'Voltar',
      onClick(e: any) {
        that.showMapSaida = false;
      },
    };
  }

  realodSaida() {
    this.markers = [];
    this.saidas.load().then((data: []) => {
      let locations: any = [];
      data.forEach((endereco: Saida) => {
        locations.push([endereco.Latitude, endereco.Longitude]);
        this.markers.push({
          location: [endereco.Latitude, endereco.Longitude],
          tooltip: {
            isShown: false,
            text: `<strong>Parada ${endereco.Parada}</strong><br> ${endereco.Logradouro}, ${endereco.Numero} ${endereco.Complemento}<b> ${endereco.Bairro} - ${endereco.Cidade} - ${endereco.UF}`,
          },
        });
      });
      if (locations.length > 1)
        this.routes = [
          {
            weight: 6,
            color: 'blue',
            opacity: 0.5,
            mode: '',
            locations: locations,
          },
        ];
    });
  }

  onFormSubmit(e: any) {
    notify(
      {
        message: 'You have submitted the form',
        position: {
          my: 'center top',
          at: 'center top',
        },
      },
      'success',
      3000
    );

    e.preventDefault();
  }

  mapOnClick(e: any) {
    this.saida.Latitude = e.location.lat;
    this.saida.Longitude = e.location.lng;
    let rowIndex = this.dataGrid?.instance.getRowIndexByKey(this.saida.Oid);
    rowIndex = rowIndex ? rowIndex : 0;
    this.dataGrid?.instance.cellValue(rowIndex, 'Latitude', e.location.lat);
    this.dataGrid?.instance.cellValue(rowIndex, 'Longitude', e.location.lng);
    this.saidaMarker = this.getGenerateSaidaMarker(this.saida);
  }
  getSaidaMarker() {
    if (!this.saidaMarker) {
      this.saidaMarker = this.getGenerateSaidaMarker(this.saida);
    }
    return this.saidaMarker;
  }
  getGenerateSaidaMarker(saida: Saida) {
    if (saida.Latitude == 0) {
      this.zoom = 5;
      return [
        {
          location: 'Brasil',
          tooltip: {
            isShown: true,
            text: `Selecione um local no mapa!`,
          },
        },
      ];
    } else {
      this.zoom = 18;
      return [
        {
          location: [saida.Latitude, saida.Longitude],
          tooltip: {
            isShown: true,
            text: `<strong>Parada ${saida.Parada}</strong><br> ${saida.Logradouro}, ${saida.Numero} ${saida.Complemento}<b> ${saida.Bairro} - ${saida.Cidade} - ${saida.UF}`,
          },
        },
      ];
    }
  }
  ngOnInit(): void {}

  rowValidating(e: any) {
    if (e.isValid && !e.oldData && e.newData.Longitude === 0) {
      e.isValid = false;
      e.errorText =
        'Você precisa marcar um ponto no mapa para definir a localização da saída!';
    }
  }
  initNewRow(e: any) {
    e.data.Parada = this.markers.length + 1;
    e.data.Latitude = 0;
    e.data.Longitude = 0;
    this.saidaMarker = undefined;
    this.saida = e.data;
  }
}
