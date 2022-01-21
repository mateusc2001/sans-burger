import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-cadastro-item-cardapio',
  templateUrl: './modal-cadastro-item-cardapio.component.html',
  styleUrls: ['./modal-cadastro-item-cardapio.component.css']
})
export class ModalCadastroItemCardapioComponent implements OnInit {

  public formNovoItem: FormGroup;
  public modoEdicao: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalCadastroItemCardapioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
    this.modoEdicao = !!data;
    this.formNovoItem = new FormGroup({
      id: new FormControl(!!data ? data.id : null),
      imagem: new FormControl(!!data ? data.imagem : null, Validators.required),
      descricao: new FormControl(!!data ? data.descricao : null, Validators.required),
      valor: new FormControl(!!data ? data.valor : null, Validators.required),
      complemento: new FormControl(!!data ? data.complemento : null, Validators.required),
      positionY: new FormControl(!!data ? data.positionImage.y : null),
      positionX: new FormControl(!!data ? data.positionImage.x : null)
    });
  }

  ngOnInit(): void {
  }

  public getPosition(itemForm: any): string {
    const x = itemForm.controls.positionX.value;
    const y = itemForm.controls.positionY.value;
    return `${x}px ${y}px`;
  }

  public onSave(): any {
    return {
      id: this.formNovoItem.controls.id.value,
      imagem: this.formNovoItem.controls.imagem.value,
      descricao: this.formNovoItem.controls.descricao.value,
      valor: this.formNovoItem.controls.valor.value,
      complemento: this.formNovoItem.controls.complemento.value,
      positionImage: {
        y: this.formNovoItem.controls.positionY.value,
        x: this.formNovoItem.controls.positionX.value
      }
    }
  }

  public decrementPositionY(itemForm: any): void {
    itemForm.controls.positionY.setValue(itemForm.controls.positionY.value - 1);
  }
  public incrementPositionY(itemForm: any): void {
    itemForm.controls.positionY.setValue(itemForm.controls.positionY.value + 1);
  }
  public decrementPositionX(itemForm: any): void {
    itemForm.controls.positionX.setValue(itemForm.controls.positionX.value - 1);
  }
  public incrementPositionX(itemForm: any): void {
    itemForm.controls.positionX.setValue(itemForm.controls.positionX.value + 1);
  }

  public getValorForm(itemForm: any) {
    return itemForm.controls.valor.value;
  }

  public getDescricaoForm(itemForm: any) {
    return itemForm.controls.descricao.value;
  }

  public getImagem(itemForm: any) {
    const value = itemForm.controls.imagem.value;
    return value ? `url(${value})` : null;
  }

  onFileSelected(event: any, itemForm: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      itemForm.controls.imagem.setValue(reader.result);
    };
  }

}
