import { Injectable } from '@angular/core';
import { ProductsDataService } from './products-data.service';

@Injectable()
export class ProductsService {
  constructor( private dataService: ProductsDataService) {
  }

  fetchAll() {
    return this.dataService.fetchAll();
  }
}
