import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rubro } from './rubro';

describe('Rubro', () => {
  let component: Rubro;
  let fixture: ComponentFixture<Rubro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rubro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rubro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
