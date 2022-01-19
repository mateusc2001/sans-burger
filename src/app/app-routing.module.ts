import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { CardapioComponent } from './componentes/admin-dashboard/cardapio/cardapio.component';
import { PromocoesComponent } from './componentes/admin-dashboard/promocoes/promocoes.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: 'cardapio',
    component: CardapioComponent
  },
  {
    path: 'promocoes',
    component: PromocoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
