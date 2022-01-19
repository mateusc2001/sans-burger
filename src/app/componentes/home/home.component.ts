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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getItens();
  }

  title = 'sans-burger-front-end';

  public getItens(): void {
    this.httpClient.get(`${environment.apiURL}/itens`)
      .subscribe((res: any) => this.itensPromocoes = res);
  }

}
