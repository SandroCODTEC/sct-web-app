import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagemComponent } from './passagem.component';

describe('PassagemComponent', () => {
  let component: PassagemComponent;
  let fixture: ComponentFixture<PassagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
