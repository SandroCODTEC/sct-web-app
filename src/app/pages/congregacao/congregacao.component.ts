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
  phonePattern: any = /^[02-9]\d{9}$/;
  mapOptions: any = { lat: -14.783911, lng: -39.046779 };
  markers: any = [
    {
      location: [-14.783911, -39.046779],
      tooltip: {
        isShown: true,
        text: 'Brasil',
      },
    },
  ];
  saidaMarker: any[] | undefined = [];
  routes: any[] = [];
  zoom = 6;
  phoneRules: any = {
    X: /[02-9]/,
  };

  buttonOptions: any = {
    text: 'Salvar',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor(dataService: DataService) {
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
  }

  realodSaida() {
    this.markers = [];
    this.saidas.load().then((data: []) => {
      let locations: any = [];
      data.forEach((endereco: Saida) => {
        locations.push([ endereco.Latitude, endereco.Longitude]);
        this.markers.push({
          location: [endereco.Latitude,endereco.Longitude],
          tooltip: {
            isShown: true,
            text: `<strong>Parada ${endereco.Parada}</strong><br> ${endereco.Logradouro}, ${endereco.Numero} ${endereco.Complemento}<b> ${endereco.Bairro} - ${endereco.Cidade} - ${endereco.UF}`,
          },
        });
      });

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

  mapOnClick(e: any, d: any) {
    d.row.data.Latitude = e.location.lat;
    d.row.data.Longitude = e.location.lng;
    let rowIndex = this.dataGrid?.instance.getRowIndexByKey(d.row.data.Oid);
    rowIndex = rowIndex ? rowIndex : 0;
    this.dataGrid?.instance.cellValue(rowIndex, 'Latitude', e.location.lat);
    this.dataGrid?.instance.cellValue(rowIndex, 'Longitude', e.location.lng);
    this.saidaMarker = this.getGenerateSaidaMarker(d.row.data);
  }
  getSaidaMarker(d: any) {
    if (!this.saidaMarker) {
      this.saidaMarker = this.getGenerateSaidaMarker(d.data);
    }
    return this.saidaMarker;
  }
  getGenerateSaidaMarker(data: any) {
    if (data.Latitude == 0) {
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
          location: [data.Latitude,data.Longitude],
          tooltip: {
            isShown: true,
            text: `<strong>Parada ${data.Parada}</strong><br> ${data.Logradouro}, ${data.Numero} ${data.Complemento}<b> ${data.Bairro} - ${data.Cidade} - ${data.UF}`,
          },
        },
      ];
    }
  }
  ngOnInit(): void {}
}
