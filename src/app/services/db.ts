import Dexie, { Table } from 'dexie';

export interface Evento {
  id?: number;
  descricao: string;
  tema: string;
  dataInicial: Date;
  dataFinal: Date;
  valorPassagem: number;
  concluido: boolean;

}
export interface EventoDia {
  id?: number;
  eventoId: number;
  data: Date;
}

export class AppDB extends Dexie {
  eventoDias!: Table<EventoDia, number>;
  eventos!: Table<Evento, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      eventos: '++id',
      todoItems: '++id, todoListId',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const eventoId = await db.eventos.add({
      descricao: 'Congresso Regional',
      tema: 'Teste',
      dataInicial: new Date(2022,2,1),
      dataFinal: new Date(2022,2,3),
      valorPassagem: 100,
      concluido: false
    });
    await db.eventoDias.bulkAdd([
      {
        eventoId: eventoId,
        data: new Date(2022,2,1),
      },
      {
        eventoId: eventoId,
        data: new Date(2022,2,2),
      },
      {
        eventoId: eventoId,
        data: new Date(2022,2,3),
      },
    ]);
  }
}
export const db = new AppDB();