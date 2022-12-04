import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { DataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-passagem',
  templateUrl: './passagem.component.html',
  styleUrls: ['./passagem.component.scss']
})
export class PassagemComponent implements OnInit {
  dataSource: any;
  dependentes: any;
  passageiros: any;
  saidas: any;
  public grupos = [
    { Value: 'CPF', Text: 'CPF' },
    { Value: 'DI', Text: 'Identidade' },
    { Value: 'CNH', Text: 'CNH' },
    { Value: 'OUTRO', Text: 'Outro' },
  ];
  constructor(public dataService: DataService) {
    this.dataSource = dataService.getLocalDataSource('Passagens');
    this.passageiros = dataService.getLocalDataSource('Passageiros');
    this.saidas = dataService.getLocalDataSource('Saidas');
  }

  ngOnInit(): void {}
  getDependentes(Oid: string) {
    if (!this.dependentes) {
      console.log(Oid);
      this.dependentes = this.getLocalDataSourceDependentes('Dependentes', Oid);
    }
    return this.dependentes;
  }
  getLocalDataSourceDependentes(table: string, Oid: string): DataSource {
    const store = this.dataService.getLocalDataStore(table);
    var dataSource = new DataSource({
      store: store,
      filter: ['Passageiro.Oid', '=', Oid],
    });
    return dataSource;
  }
}
