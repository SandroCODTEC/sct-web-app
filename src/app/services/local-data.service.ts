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
