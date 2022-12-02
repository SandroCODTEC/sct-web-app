import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageiroComponent } from './passageiro.component';

describe('PassageiroComponent', () => {
  let component: PassageiroComponent;
  let fixture: ComponentFixture<PassageiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassageiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
