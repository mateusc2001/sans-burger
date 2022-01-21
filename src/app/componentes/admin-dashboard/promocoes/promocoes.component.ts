import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemPromocaoModelMapper } from './mapper/item-promocao-model.mapper';
import { PromocoesService } from './service/promocoes.service';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.css']
})
export class PromocoesComponent implements OnInit {

  public buscandoItensPromocoes: boolean = true;
  public itensSalvos: any;
  public base64Output: any = null;

  public formGroupItens!: FormGroup;
  constructor(private httpClient: HttpClient,
    private promocoesService: PromocoesService) {
    this.buscandoItensPromocoes = true;
    this.httpClient.get(`${environment.apiURL}/promocao/itens`)
      .subscribe((res: any) => {
        this.buscandoItensPromocoes = false;
        this.formGroupItens = this.buildFormGroup(res);
        this.itensSalvos = res;
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
            imagem: new FormControl(item.imagem, [Validators.required]),
            imagePositionY: new FormControl(item.positionImage.y, [Validators.required]),
            imagePositionX: new FormControl(item.positionImage.x, [Validators.required])
          });
          this.disableEdit(control);
          return control;
        })
      )
    });
  }

  ngOnInit(): void {

  }

  onFileSelected(event: any, itemForm: any) {
    this.convertFile(event.target.files[0], itemForm);
  }

  convertFile(file: File, itemForm: any): void {
    // const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      itemForm.controls.imagem.setValue(reader.result);
    };
  }

  public clearPosition(itemForm: any): void {
    itemForm.controls.imagePositionX.setValue(0);
    itemForm.controls.imagePositionY.setValue(0);
  }

  public positionEdited(itemForm: any): boolean {
    const response = itemForm.controls.imagePositionX.value != 0 ||
    itemForm.controls.imagePositionY.value != 0;
    return response;
  }

  public incrementPositionY(itemForm: any): void {
    itemForm.controls.imagePositionY.setValue(itemForm.controls.imagePositionY.value + 1);
  }

  public incrementPositionX(itemForm: any): void {
    itemForm.controls.imagePositionX.setValue(itemForm.controls.imagePositionX.value + 1);
  }

  public decrementPositionX(itemForm: any): void {
    itemForm.controls.imagePositionX.setValue(itemForm.controls.imagePositionX.value - 1);
  }

  public decrementPositionY(itemForm: any): void {
    itemForm.controls.imagePositionY.setValue(itemForm.controls.imagePositionY.value - 1);
  }

  public getPositionForm(itemForm: any): string {
    return `${itemForm.controls.imagePositionX.value}px ${itemForm.controls.imagePositionY.value}px`;
  }

  public enableEdit(itemForm: any): void {
    itemForm.controls.descricao.enable();
    itemForm.controls.valor.enable();
  }

  public disableEdit(itemForm: any, zerarForm: boolean = false): void {
    itemForm.controls.descricao.disable();
    itemForm.controls.valor.disable();
    if (zerarForm) {
      const item = this.itensSalvos.find((item: any) => item.id == itemForm.controls.id.value);
      itemForm.controls.descricao.setValue(item.descricao);
      itemForm.controls.valor.setValue(item.valor);
      itemForm.controls.imagem.setValue(item.imagem);
      itemForm.controls.imagePositionY.setValue(item.positionImage.y);
      itemForm.controls.imagePositionX.setValue(item.positionImage.x);
    }
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
      controls.valor.value,
      controls.imagePositionX.value,
      controls.imagePositionY.value);

    this.promocoesService.editarItem(itemPromocaoModel)
      .subscribe(
        () => this.disableEdit(itemForm),
        (err: any) => console.log(`err ${err}`)
      );
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
