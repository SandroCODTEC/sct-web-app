import { Injectable } from '@angular/core';
import LocalStore from 'devextreme/data/local_store';
import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor() {}

  getDataStore(table: string, key: string = 'id'): LocalStore {
    const store = new LocalStore({
      key: key,
      name: table,
      immediate: true,
      flushInterval: 500
    });
    return store;
  }
  getDataSource(table: string, key: string = 'id'): DataSource {
    const store = this.getDataStore(table, key);
    var dataSource = new DataSource({
      store: store,
    });
    return dataSource;
  }
  getActionLookUpDataSource(table: string, key: string = 'id') {
    var dataSource = {
      store: this.getDataStore(table, key),
    };
    return dataSource;
  }
}
