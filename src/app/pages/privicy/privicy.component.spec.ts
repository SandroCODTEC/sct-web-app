import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivicyComponent } from './privicy.component';

describe('PrivicyComponent', () => {
  let component: PrivicyComponent;
  let fixture: ComponentFixture<PrivicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
