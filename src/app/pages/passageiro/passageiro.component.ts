import { Component, OnInit } from '@angular/core';
import DevExpress from 'devextreme';
import DataSource from 'devextreme/data/data_source';
import { DataService } from 'src/app/services/local-data.service';
import Guid from 'devextreme/core/guid';

@Component({
  selector: 'app-passageiro',
  templateUrl: './passageiro.component.html',
  styleUrls: ['./passageiro.component.scss'],
})
export class PassageiroComponent implements OnInit {
  dataSource: any;
  dependentes: any;
  correntOid: string = '';
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
    if (!this.dependentes || Oid != this.correntOid) {
      this.correntOid = Oid;
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
  getGenerateOid():string{
    return new Guid().toString()
  }
}
