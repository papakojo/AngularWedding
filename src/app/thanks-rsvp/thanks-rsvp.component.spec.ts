import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksRSVPComponent } from './thanks-rsvp.component';

describe('ThanksRSVPComponent', () => {
  let component: ThanksRSVPComponent;
  let fixture: ComponentFixture<ThanksRSVPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksRSVPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksRSVPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
