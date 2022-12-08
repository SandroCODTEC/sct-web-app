import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Store } from 'devextreme/data';
import { Evento, Passagem } from 'src/app/models/congregacao';
import { DataService } from 'src/app/services/local-data.service';
import Query from 'devextreme/data/query';
import { PassagemService } from 'src/app/services/passagem.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  eventoStore: Store;
  evento: Evento = <Evento>{};
  passagens: Passagem[] = [];

  finCusto: number = 100;
  finRecebido: number = 50;

  estatisticas: any[] = [];
  constructor(
    private dataService: DataService,
    private passagemService: PassagemService
  ) {
    this.eventoStore = dataService.getLocalDataStore('Eventos');
    this.changeEvento();
  }
  changeEvento() {
    this.estatisticas = [];
    this.finCusto = 0;
    this.finRecebido = 0;
    this.eventoStore.byKey(this.passagemService.currentEvento).then((data) => {
      this.evento = data;
    });
    this.dataService
      .getLocalDataSource(this.passagemService.currentEvento)
      .load()
      .then((data: Passagem[]) => {
        let totalDependentes = 0;
        data.forEach((p) => {
          console.log(p.ValorPago, p.Dias.length);
          this.finCusto += this.evento.ValorPassagem * p.Dias.length;
          if (p.ValorPago) this.finRecebido += p.ValorPago;
          if (p.Dependentes) totalDependentes += p.Dependentes.length;
        });
        this.estatisticas.push({
          Name: 'Total Geral',
          Passagens: data.length,
          Dependentes: totalDependentes,
        });
        const dias = this.passagemService.getFiltredDias();
        dias.forEach((d) => {
          this.estatisticas.push({
            Name: d.Text,
            Passagens: data.length,
            Dependentes: totalDependentes,
          });
        });
        // let query = Query(data);
        // query
        //   .filter((f: Passagem) => f.ValorPago !== undefined)
        //   .select('ValorPago')
        //   .sum()
        //   .then((valor) => {
        //     debugger;
        //     this.finRecebido = valor;
        //   });
        // Query(
        //   query
        //     .select('Dias')
        //     .toArray()
        //     .map((m: []) => m.length)
        // )
        //   .sum()
        //   .then((soma) => (this.finCusto = soma * this.evento.ValorPassagem));
      });
  }
  ngAfterViewInit(): void {}
  screen(width: any): string {
    return width < 700 ? 'sm' : 'lg';
  }
}
