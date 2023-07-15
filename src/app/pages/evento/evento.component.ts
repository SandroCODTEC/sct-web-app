import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
})
export class EventoComponent implements OnInit {
  dataSource: any;
  constructor(private dataService: DataService) {
    let eventos = localStorage.getItem('dx-data-localStore-Eventos') || 'null'; 
    if(JSON.parse(eventos) == undefined || JSON.parse(eventos) == null)
      localStorage.setItem('dx-data-localStore-Eventos', [].toString()); 

    this.dataSource = dataService.getLocalDataSource('Eventos');
  }

  ngOnInit(): void {}
}
