import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public itensPromocoes: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getItens();
  }

  title = 'sans-burger-front-end';

  public getItens(): void {
    this.httpClient.get('https://calm-island-63289.herokuapp.com/itens')
      .subscribe((res: any) => this.itensPromocoes = res);
  }

}
