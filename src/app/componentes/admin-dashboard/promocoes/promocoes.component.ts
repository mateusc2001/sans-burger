import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemPromocaoModelMapper } from './mapper/item-promocao-model.mapper';
import { PromocoesService } from './service/promocoes.service';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.css']
})
export class PromocoesComponent implements OnInit {

  public buscandoItensPromocoes: boolean = true;

  public formGroupItens!: FormGroup;
  constructor(private httpClient: HttpClient,
    private promocoesService: PromocoesService) {
    this.buscandoItensPromocoes = true;
    this.httpClient.get(`https://calm-island-63289.herokuapp.com/itens`)
      .subscribe((res: any) => {
        this.buscandoItensPromocoes = false;
        this.formGroupItens = this.buildFormGroup(res);
      });
  }

  public buildFormGroup(itens: any[]): FormGroup {
    return new FormGroup({
      itens: new FormArray(itens
        .map(item => {
          let control = new FormGroup({
            id: new FormControl(item.id, [Validators.required]),
            descricao: new FormControl(item.descricao, [Validators.required]),
            valor: new FormControl(item.valor, [Validators.required]),
            imagem: new FormControl(item.imagem, [Validators.required])
          });
          control.controls.descricao.disable();
          control.controls.valor.disable();
          return control;
        })
      )
    });
  }

  ngOnInit(): void {

  }

  public enableEdit(itemForm: any): void {
    itemForm.controls.descricao.enable();
    itemForm.controls.valor.enable();
  }

  public disableEdit(itemForm: any): void {
    itemForm.controls.descricao.disable();
    itemForm.controls.valor.disable();
  }

  public editarAtivo(itemForm: any): boolean {
    return itemForm.controls.valor.enabled && itemForm.controls.descricao.enabled;
  }

  public getValorForm(itemForm: any): number {
    return itemForm.controls.valor.value;
  }

  public getDescricaoForm(itemForm: any): string {
    return itemForm.controls.descricao.value;
  }

  public salvar(itemForm: any): void {
    const controls = itemForm.controls;
    const itemPromocaoModel = ItemPromocaoModelMapper.buildItemPromocaoModel(controls.id.value,
      controls.imagem.value,
      controls.descricao.value,
      controls.valor.value);

    this.promocoesService.editarItem(itemPromocaoModel)
      .subscribe(() => this.disableEdit(itemForm));
  }
  get itens() {
    return this.formGroupItens.controls["itens"] as FormArray;
  }

  public getImagem(itemForm: any) {
    return itemForm.controls.imagem.value;
  }

  public desabilitarInput(item: any): boolean {
    return false;
  }

}
