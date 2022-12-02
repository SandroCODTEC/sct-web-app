import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacaoComponent } from './congregacao.component';

describe('CongregacaoComponent', () => {
  let component: CongregacaoComponent;
  let fixture: ComponentFixture<CongregacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongregacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
