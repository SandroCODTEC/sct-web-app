import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-input-key',
  templateUrl: './input-key.component.html',
  styleUrls: ['./input-key.component.scss'],
})
export class InputKeyComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form:
    | DxFormComponent
    | undefined;
  @Input() show: boolean = false;
  @Input() value: any = { Chave: '' };
  @Input() height: number = 500;
  @Input() width: number = 500;

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  keyPattern = /^[-_a-zA-Z0-9.]+$/;
  constructor() {
    this.ok = this.ok.bind(this);
    this.makeKey = this.makeKey.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  ngOnInit(): void {}

  showDialog() {
    this.show = true;
  }
  generateKey(): string {
    return '';
  }
  makeKey() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.value.Chave = result;
  }
  ok() {
    if (this.form?.instance.validate().status === 'valid') {
      this.show = false;
      this.saved.emit(this.value);
    }
  }
  cancel() {
    this.show = false;
  }
}
