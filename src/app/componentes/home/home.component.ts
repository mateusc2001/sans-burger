import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public itensPromocoes: any;
  public apiUrl: string = environment.apiURL;
  novidades: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getItens();
    this.httpClient.get(`${environment.apiURL}/cardapio/item`)
      .subscribe(res => this.novidades = res);
  }

  title = 'sans-burger-front-end';

  public getItens(): void {
    this.httpClient.get(`${environment.apiURL}/promocao/itens`)
      .subscribe((res: any) => this.itensPromocoes = res);
  }

  public getPositionForm(item: any): string {
    return `${item.positionImage.x}px ${item.positionImage.y}px`;
  }

  public getImagem(item: any): string {
    return `url(${item.imagem})`;
  }
}
