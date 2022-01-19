import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemPromocaoRequestMapper } from '../mapper/item-promocao-request.mapper';
import { ItemPromocaoModel } from '../model/item-promocao.model';

@Injectable({
  providedIn: 'root'
})
export class PromocoesService {

  constructor(private httpClient: HttpClient) { }

  public editarItem(itemPromocaoModel: ItemPromocaoModel): any {
    const request = ItemPromocaoRequestMapper.mapTo(itemPromocaoModel);
    return this.httpClient.put('https://calm-island-63289.herokuapp.com/item/promocao', request);
  }
}
