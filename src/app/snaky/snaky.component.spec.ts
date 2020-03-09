import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakyComponent } from './snaky.component';

describe('SnakyComponent', () => {
  let component: SnakyComponent;
  let fixture: ComponentFixture<SnakyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
