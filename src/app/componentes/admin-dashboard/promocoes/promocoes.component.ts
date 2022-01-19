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
  public base64Output: any = null;

  public formGroupItens!: FormGroup;
  constructor(private httpClient: HttpClient,
    private promocoesService: PromocoesService) {
    this.buscandoItensPromocoes = true;
    this.httpClient.get(`${environment.apiURL}/itens`)
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
