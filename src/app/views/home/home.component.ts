import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../core/interfaces/product.interface';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Default
})
export class HomePageComponent  {
    products$: Observable<Product[]>;

    constructor(private products: ProductsService,
    ) {
        this.products$ = this.products.fetchAll();
    }

}
