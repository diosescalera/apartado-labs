import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesLaboratorioComponent } from './detalles-laboratorio.component';

describe('DetallesLaboratorioComponent', () => {
  let component: DetallesLaboratorioComponent;
  let fixture: ComponentFixture<DetallesLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesLaboratorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
