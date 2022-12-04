import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { DataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-passageiro',
  templateUrl: './passageiro.component.html',
  styleUrls: ['./passageiro.component.scss'],
})
export class PassageiroComponent implements OnInit {
  dataSource: any;
  dependentes: any;
  public tipos = [
    { Value: 'CPF', Text: 'CPF' },
    { Value: 'DI', Text: 'Identidade' },
    { Value: 'CNH', Text: 'CNH' },
    { Value: 'OUTRO', Text: 'Outro' },
  ];
  constructor(public dataService: DataService) {
    this.dataSource = dataService.getLocalDataSource('Passageiros');
  }

  ngOnInit(): void {}
  getDependentes(Oid: string) {
    if (!this.dependentes) {
      console.log(Oid);
      //this.dependentes = this.dataService.getArrayDataSource(array);
      this.dependentes = this.getLocalDataSource('Dependentes', Oid);
    }
    return this.dependentes;
  }
  getLocalDataSource(table: string, Oid: string): DataSource {
    const store = this.dataService.getLocalDataStore(table);
    var dataSource = new DataSource({
      store: store,
      filter: ['Passageiro.Oid', '=', Oid],
    });
    return dataSource;
  }
  getLocalDataSource2(table: string, Oid: string): DataSource {
    const array = [
      '5663279b-7ce9-07d8-4d04-aafddfdc0d57',
      'a5a95ddc-664a-68d8-c1a7-d179c3c6a188',
      '6573d7e3-3490-2cc3-33ac-a566fb117fda',
    ];
    let filter: any[] = [];
    array.forEach((value) => {
      filter.push(['Passageiro.Oid', '=', value]);
      filter.push('or');
    });
    //const filter = ['5663279b-7ce9-07d8-4d04-aafddfdc0d57','a5a95ddc-664a-68d8-c1a7-d179c3c6a188', '6573d7e3-3490-2cc3-33ac-a566fb117fda'].map(m => ['Passageiro.Oid', '=', m]).join(', or ,');
    console.log(filter);
    const store = this.dataService.getLocalDataStore(table);
    var dataSource = new DataSource({
      store: store,
      filter: filter,
    });
    return dataSource;
  }
}
