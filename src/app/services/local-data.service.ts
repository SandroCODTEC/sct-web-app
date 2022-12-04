import { Injectable } from '@angular/core';
import LocalStore from 'devextreme/data/local_store';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getLocalDataStore(table: string, key: string = 'Oid'): LocalStore {
    const store = new LocalStore({
      key: key,
      name: table,
      immediate: true,
      flushInterval: 500
    });
    return store;
  }
  getArrayDataStore(array: any, key: string = 'Oid'): LocalStore {
    const store = new ArrayStore({
      key: key,
      data: array
    });
    return store;
  }
  getLocalDataSource(table: string, key: string = 'Oid'): DataSource {
    const store = this.getLocalDataStore(table, key);
    var dataSource = new DataSource({
      store: store,
    });
    return dataSource;
  }
  getArrayDataSource(array: any, key: string = 'Oid'): DataSource {
    const store = this.getArrayDataStore(array, key);
    var dataSource = new DataSource({
      store: store,
    });
    return dataSource;
  }
  getLocalLookUpDataSource(table: string, key: string = 'Oid') {
    var dataSource = {
      store: this.getLocalDataStore(table, key),
    };
    return dataSource;
  }
  getArrayLookUpDataSource(array: any, key: string = 'Oid') {
    var dataSource = {
      store: this.getArrayDataStore(array, key),
    };
    return dataSource;
  }
}
