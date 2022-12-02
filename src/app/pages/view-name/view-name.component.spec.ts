import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNameComponent } from './view-name.component';

describe('ViewNameComponent', () => {
  let component: ViewNameComponent;
  let fixture: ComponentFixture<ViewNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
