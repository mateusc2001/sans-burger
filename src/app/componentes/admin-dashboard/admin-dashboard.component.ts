import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public opcoes = [
    {
      icon: 'restaurant_menu',
      route: '/cardapio',
      descricao: 'Ver cardápio'
    },
    {
      icon: 'money_off',
      route: '/promocoes',
      descricao: 'Ver promoções'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
