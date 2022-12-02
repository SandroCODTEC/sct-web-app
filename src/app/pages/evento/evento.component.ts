import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
})
export class EventoComponent implements OnInit {
  dataSource: any;
  constructor(private localDataService: LocalDataService) {
    this.dataSource = localDataService.getDataSource('Eventos');
  }

  ngOnInit(): void {}
}
