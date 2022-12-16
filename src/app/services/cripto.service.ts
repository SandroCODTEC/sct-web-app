import { Injectable } from '@angular/core';
//Inside imports of your TS file include
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CriptoService {
  constructor() {}

  // Methods for the encrypt and decrypt Using AES
  encryptUsingAES2560(chave: string, decrypted: string): string {
    const key = CryptoJS.enc.Utf8.parse(chave);
    const iv = CryptoJS.enc.Utf8.parse(chave);
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(decrypted),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  }

  decryptUsingAES256(chave: string, decString: any): string {
    const key = CryptoJS.enc.Utf8.parse(chave);
    const iv = CryptoJS.enc.Utf8.parse(chave);
    var decrypted = CryptoJS.AES.decrypt(decString, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString();
  }
}
