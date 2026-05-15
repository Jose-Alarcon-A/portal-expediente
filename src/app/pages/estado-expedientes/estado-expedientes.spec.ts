import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoExpedientes } from './estado-expedientes';

describe('EstadoExpedientes', () => {
  let component: EstadoExpedientes;
  let fixture: ComponentFixture<EstadoExpedientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoExpedientes],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoExpedientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
