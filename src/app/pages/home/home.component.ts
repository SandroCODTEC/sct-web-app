import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Store } from 'devextreme/data';
import { Evento, Passagem } from 'src/app/models/congregacao';
import { DataService } from 'src/app/services/local-data.service';
import Query from 'devextreme/data/query';
import { PassagemService } from 'src/app/services/passagem.service';
import notify from 'devextreme/ui/notify';

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
    public passagemService: PassagemService
  ) {
    this.eventoStore = dataService.getLocalDataStore('Eventos');
    this.changeEvento();
  }
  changeEvento() {
    if (!this.passagemService.currentEvento) {
      return;
    }
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
        const dias = this.passagemService.getFiltredDias();
        dias.forEach((d) => {
          console.log(d.Value, data);
          var diaPassagens = data.filter((f) =>
            f.Dias ? (<any[]>f.Dias).includes(d.Value) : 0
          );
          this.estatisticas.push({
            Name: d.Text,
            Passagens: diaPassagens.length,
            Dependentes: diaPassagens.reduce(
              (s, o) => s+ (o.Dependentes ? o.Dependentes.length : 0),
              0
            ),
          });
        });
        this.estatisticas.push({
          Name: 'Total Geral',
          Passagens: this.estatisticas.reduce((s, o) => s + o.Passagens, 0),
          Dependentes: this.estatisticas.reduce((s, o) => s + o.Dependentes, 0),
        });
      });
  }
  ngAfterViewInit(): void {}
  screen(width: any): string {
    return width < 700 ? 'sm' : 'lg';
  }
}
