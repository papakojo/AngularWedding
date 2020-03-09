import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenWhereComponent } from './when-where.component';

describe('WhenWhereComponent', () => {
  let component: WhenWhereComponent;
  let fixture: ComponentFixture<WhenWhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhenWhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhenWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
