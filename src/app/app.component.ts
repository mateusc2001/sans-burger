import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public itensPromocoes: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getItens();
  }

  title = 'sans-burger-front-end';

  public getItens(): void {
    this.httpClient.get('http://localhost:2020/itens')
      .subscribe((res: any) => this.itensPromocoes = res);
  }
}


// function addNovidades() {
//   const containerCards = document.getElementById('container-main-novidades-cards');
//   const novidades = [
//       {
//           img: 'http://localhost:2020/image/hamburger.jpg',
//           descricao: 'Duplo bacon',
//           valor: 29.9,
//           complemento: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Fuidhir Pinnately.',
//           transform: {
//               horizontal: -40,
//               vertical: 0
//           }
//       },
//       {
//           img: 'http://localhost:2020/image/hamburger.jpg',
//           descricao: 'Duplo bacon',
//           valor: 29.9,
//           complemento: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Fuidhir Pinnately.',
//           transform: {
//               horizontal: -40,
//               vertical: 0
//           }
//       },
//       {
//           img: 'http://localhost:2020/image/hamburger.jpg',
//           descricao: 'Duplo bacon',
//           valor: 29.9,
//           complemento: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Fuidhir Pinnately.',
//           transform: {
//               horizontal: -40,
//               vertical: 0
//           }
//       }
//   ];

//   novidades.forEach(item => {
//       containerCards.innerHTML += `<div class="card-item-novidade">
//               <div class="container-img-novidade" style="width: 100%; height: 60%; background-image: url(${item.img}); background-size: cover; background-position: ${item.transform.vertical}px ${item.transform.horizontal}px;"></div>
//               <div class="container-description-novidade" style="height: 40%;">
//                   <div style="display: flex; justify-content: space-around; align-items: center; width: 100%; height: 60%;">
//                       <span style="font-size: 25px; font-weight: 400;">${item.descricao}</span>
//                       <span style="font-size: 25px; font-weight: 400; color: rgb(247, 189, 43);">R$${item.valor.toFixed(2)}</span>
//                   </div>
//                   <div style="padding: 0 20px 20px 20px; font-size: 20px; font-weight: 400; color: gray; display: flex; justify-content: center; align-items: center;  width: 100%; height: 50%;">${item.complemento}
//                   </div>
//               </div>
//           </div>`;
//   });
// }

// addPromocoes();
// addNovidades();