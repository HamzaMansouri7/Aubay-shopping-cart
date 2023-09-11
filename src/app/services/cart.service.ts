import { CartDataService } from './cart-data.service';
import { Injectable } from '@angular/core';
import { CartItem } from '../core/interfaces/cart-item.interface';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../core/interfaces/product.interface';
import { aubayUid } from '../../Utils/helpers';

interface CartProducts {
    items: CartItem[];
    total: number;
}

@Injectable()
export class CartService {
    protected _products = {
        items: [],
        total: 0,
    };

    protected _cartState = new Subject<CartProducts>();

    constructor(
        protected dataService: CartDataService,
    ) { }

    getStoredCartItems() {
        this.dataService.fetchAll().pipe(
            tap(data => {
                data.map(({product , amount}) => this.addProduct(product , amount));
            })
        ).subscribe();
    }


    addProduct(product: Product , amount = 1) {
        const existingCartItem = this._products.items.find(item => item.product.id === product.id);
        if (existingCartItem) {
            existingCartItem.amount++;
            existingCartItem.subtotal = this.calculateSubtotal(existingCartItem);
        } else {
            const newCartItem: CartItem = {
                id: product.id,
                product,
                amount,
                subtotal: this.calculateSubtotal({ product, amount }),
            };
            this._products.items.push(newCartItem);
        }
        this._products.total = this.calculateTotal(this._products.items);
        this.updateCartState(this._products);
    }


    removeProduct(product: Product, shouldRemoveAll = false) {
        const cartItem = this._products.items.find(item => item.product.id === product.id);
        if (!cartItem) {
            return;
        }
        if (shouldRemoveAll || cartItem.amount === 1) {
            const index = this._products.items.indexOf(cartItem);
            this._products.items.splice(index, 1);
        } else {
            cartItem.amount--;
            cartItem.subtotal = this.calculateSubtotal(cartItem);
        }
        this._products.total = this.calculateTotal(this._products.items);
        this.updateCartState(this._products);
    }


    protected updateCartState(products: CartProducts) {
        this._products = products;
        this._cartState.next(products);
    }

    protected calculateTotal(items: CartItem[]): number {
        return items.reduce((total, item) => total += item.subtotal, 0);
    }

    protected calculateSubtotal(item: CartItem): number {
        return item.product.price * item.amount;
    }

    protected getProducts() {
        this._cartState.subscribe((resp) => {
            this._products = resp;
        });
        return this._products;
    }

    getItems() {
        return this.getProducts().items;
    }

    getItem(id: string) {
        return this.getItems().find(item => item.product.id === id);
    }

    getTotal() {
        return this.getProducts().total;
    }

    getCartUpdates() {
        return this._cartState.pipe(
            map(() => this.getItems())
        );
    }

    getItemUpdates(id: string) {
        return this._cartState.pipe(
            map(() => this.getItem(id)));
    }

    getTotalUpdates() {
        return this._cartState.pipe(map((s) => s.total));
    }
}
