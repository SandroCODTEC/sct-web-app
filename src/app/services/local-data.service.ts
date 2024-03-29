import { Injectable } from '@angular/core';
import LocalStore from 'devextreme/data/local_store';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  resetValue(local: string) {
    const dependentesData = this.valueGet(local);
    if (dependentesData === 'null') this.valueSet(local, JSON.stringify([]));
  }
  resetValues() {
    this.resetValue(`dx-data-localStore-Dependentes`);
    this.resetValue(`dx-data-localStore-Saidas`);
    this.resetValue(`dx-data-localStore-Congregacao`);
    this.resetValue(`dx-data-localStore-Passageiros`);
    this.resetValue(`dx-data-localStore-Eventos`);
  }
  valueSet(key: string, value: string): boolean {
    if (this.storage) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }

  valueGet(key: string): any {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return null;
  }

  valueRemove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }
  getLocalDataStore(table: string, key: string = 'Oid'): LocalStore {
    const store = new LocalStore({
      key: key,
      name: table,
      immediate: true,
      flushInterval: 500,
    });
    return store;
  }
  getArrayDataStore(array: any, key: string = 'Oid'): LocalStore {
    const store = new ArrayStore({
      key: key,
      data: array,
    });
    return store;
  }
  getLocalDataSource(table: string, key: string = 'Oid'): DataSource {
    const store = this.getLocalDataStore(table, key);
    var dataSource = new DataSource({
      store: store,
      paginate: false,
    });

    return dataSource;
  }
  getArrayDataSource(array: any, key: string = 'Oid'): DataSource {
    const store = this.getArrayDataStore(array, key);
    var dataSource = new DataSource({
      store: store,
      paginate: false,
    });
    return dataSource;
  }
  getLocalLookUpDataSource(table: string, key: string = 'Oid') {
    var dataSource = {
      store: this.getLocalDataStore(table, key),
      paginate: false,
    };
    return dataSource;
  }
  getArrayLookUpDataSource(array: any, key: string = 'Oid') {
    var dataSource = {
      store: this.getArrayDataStore(array, key),
      paginate: false,
    };
    return dataSource;
  }
}
