import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalCadastroItemCardapioComponent } from './modais/modal-cadastro-item-cardapio/modal-cadastro-item-cardapio.component';
import { ModalConfirmacaoExclusaoComponent } from './modais/modal-confirmacao-exclusao/modal-confirmacao-exclusao.component';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  public buscandoItensPromocoes: boolean = true;
  public itensCardapio: any = [];
  public apiUrl: string = environment.apiURL;

  constructor(private httpClient: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buscarItens();
  }

  public buscarItens(): void {
    this.buscandoItensPromocoes = true;
    this.httpClient.get(`${this.apiUrl}/cardapio/item`)
      .subscribe(res => {
        this.buscandoItensPromocoes = false;
        this.itensCardapio = res;
      });
  }

  openDialog(item: any = null): void {
    const dialogRef = this.dialog.open(ModalCadastroItemCardapioComponent, {
      width: '450px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (!!item) {
          this.httpClient.put(`${environment.apiURL}/cardapio/item`, result)
            .subscribe(res => this.buscarItens());
        } else {
          this.httpClient.post(`${environment.apiURL}/cardapio/item`, result)
            .subscribe(res => this.buscarItens());
        }
      }
    });
  }

  openDialogConfirmarExclusao(idItem: string): void {
    const dialogRef = this.dialog.open(ModalConfirmacaoExclusaoComponent, {
      width: '250px'
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) this.apagarItem(idItem);
      });
  }

  public getPositionForm(item: any): string {
    return `${item.positionImage.x}px ${item.positionImage.y}px`;
  }

  public getImagem(item: any): string {
    return `url(${item.imagem})`;
  }

  public apagarItem(idItem: string): void {
    this.httpClient.delete(`${environment.apiURL}/cardapio/item/${idItem}`)
      .subscribe(res => {
        this.buscarItens();
        this.openSnackBar();
      });
  }

  openSnackBar() {
    const horizontalPotition: MatSnackBarHorizontalPosition = 'end';
    const verticalPotition: MatSnackBarVerticalPosition = 'top';
    this._snackBar.open('Item excluido!', 'fechar', {
      horizontalPosition: horizontalPotition,
      verticalPosition: verticalPotition,
      duration: 4000
    });
  }
}
