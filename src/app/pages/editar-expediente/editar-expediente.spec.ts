import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExpediente } from './editar-expediente';

describe('EditarExpediente', () => {
  let component: EditarExpediente;
  let fixture: ComponentFixture<EditarExpediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarExpediente],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarExpediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
