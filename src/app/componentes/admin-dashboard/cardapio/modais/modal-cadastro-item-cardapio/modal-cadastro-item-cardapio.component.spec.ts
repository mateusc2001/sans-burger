import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroItemCardapioComponent } from './modal-cadastro-item-cardapio.component';

describe('ModalCadastroItemCardapioComponent', () => {
  let component: ModalCadastroItemCardapioComponent;
  let fixture: ComponentFixture<ModalCadastroItemCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroItemCardapioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastroItemCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
