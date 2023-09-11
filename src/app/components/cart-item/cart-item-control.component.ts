import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { Product } from '../../core/interfaces/product.interface';
import { CartItem } from '../../core/interfaces/cart-item.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-item-control',
  templateUrl: 'cart-item-control.component.html',
  styleUrls: ['cart-item-control.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CartItemControlComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  item: CartItem;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private cart: CartService) {}

  ngOnInit() {
    this.cart.getStoredCartItems();
    this.cart.getItemUpdates(this.product.id)
      .pipe(
        tap((item) => this.item = item),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  addProduct(product: Product) {
    this.cart.addProduct(product);
  }

  removeProduct(product: Product) {
    this.cart.removeProduct(product);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
